# Guide: Creating New CMS Controls in Admin Panel

This guide explains the step-by-step process of adding a new section (like "Case Studies" or "Testimonials") to the React Admin Panel, storing it in the backend, and displaying it in the frontend.

## Step 1: Add Navigation Button in `App.jsx`
Locate the `switch (activeSidebar)` block in `App.jsx` where the sidebar menus are rendered. Add a new button for your section.
```jsx
// Example for Agency sidebar
<button className={`sub-nav-item ${activeSubMenu === 'case_studies' ? 'active' : ''}`} onClick={() => setActiveSubMenu('case_studies')}>
  <div className="label-group"><Briefcase size={16} /> Case Studies</div>
</button>
```

## Step 2: Create the Editor UI in `renderEditor()`
Inside the `renderEditor` function, add a condition to render your new section.
```jsx
if (activeSidebar === 'agency' && activeSubMenu === 'case_studies') {
  const caseStudies = content.agency?.caseStudies || [];

  return (
    <div className="editor-form-pane">
      <div className="form-header">
        <h2>Case Studies</h2>
        <button onClick={handleAddNewCaseStudy}>Add Case Study</button>
      </div>
      {/* Map through caseStudies and render inputs */}
    </div>
  );
}
```

## Step 3: Implement Update Handlers
Create functions to update the global `content` state.
```jsx
// Updating a simple text field
const handleUpdateCaseStudy = (index, field, value) => {
  setContent(prev => {
    const newState = JSON.parse(JSON.stringify(prev));
    if (!newState.agency.caseStudies) newState.agency.caseStudies = [];
    newState.agency.caseStudies[index][field] = value;
    return newState;
  });
};
```

## Step 4: Implement Image Uploads (IMPORTANT)
**Do not use `FileReader` and base64 strings!** They will break the frontend or cause huge DB payloads.
Always use `FormData` and send it to the `/api/upload` endpoint.
```jsx
const handleImageUpload = async (e, index) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('image', file);
  try {
    const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.url) {
      handleUpdateCaseStudy(index, 'image', data.url);
    }
  } catch (err) {
    console.error('Upload failed:', err);
  }
};
```

## Step 5: Modals for Adding New Items (Optional)
If your list requires a modal to add new items, create a state for it (`showAddModal`) and render it below the main editor form. Be sure to use the exact same image upload approach using `/api/upload`.

## Step 6: Frontend Integration
In your frontend React component (e.g., `client/src/pages/Agency/components/CaseStudies.jsx`):
1. Import `getCachedContent` and `fetchContent` from `utils/api.js`.
2. Use `useState` to store the dynamic data.
3. Use `useEffect` to fetch the data. **Always fetch fresh data** after loading from cache so new additions appear without hard refresh.
```jsx
import { getCachedContent, fetchContent } from '../../../utils/api';

const [dynamicStudies, setDynamicStudies] = useState([]);

useEffect(() => {
  // Set cache as initial value
  const cached = getCachedContent();
  if (cached?.agency?.caseStudies) {
    setDynamicStudies(cached.agency.caseStudies);
  }
  // Always fetch fresh data to pick up new CMS saves
  fetchContent().then(data => {
    if (data?.agency?.caseStudies) {
      setDynamicStudies(data.agency.caseStudies);
    }
  }).catch(console.error);
}, []);
```

## Step 7: Merging Static and Dynamic Data
If you have static default data, merge the dynamic data from the CMS into it, or replace it entirely depending on the requirements.
```jsx
const displayStudies = dynamicStudies.length > 0 ? dynamicStudies : staticCaseStudiesData;
```

## Remember: The Save Button
The universal Save button at the bottom of the section in `App.jsx` handles sending the updated `content` state to the server (e.g., `PUT /api/content/agency`). You don't need to write a custom save API call for each new section as long as you properly mutate the `content` state!
