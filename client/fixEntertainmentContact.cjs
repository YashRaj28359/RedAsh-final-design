const fs = require('fs');
let code = fs.readFileSync('src/pages/Entertainment/EntertainmentContact.jsx', 'utf8');

// 1. Add fetchContent import
if (!code.includes('import { fetchContent } from')) {
    code = code.replace("import ContactForm from '../../components/ContactForm/ContactForm';", "import ContactForm from '../../components/ContactForm/ContactForm';\r\nimport { fetchContent } from '../../utils/api';");
}

// 2. Replace static contactData object with state
const staticStateRegex = /const contactData = {[\s\S]*?};/;
const newState = `const [contactData, setContactData] = useState({
    addressTitle: 'RedAsh, 1101, Peninsula Park',
    addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
    mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754702008323!2d72.83299317593922!3d19.118432350639912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bbc70d9!2sPeninsula%20Park!5e0!3m2!1sen!2sin!4v1716388437021!5m2!1sen!2sin',
    email1: 'info@redashfilms.com',
    email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
    email2: 'redash.films@gmail.com',
    email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
  });

  useEffect(() => {
    fetchContent().then(data => {
      if (data?.global?.contact) {
        setContactData(prev => ({ ...prev, ...data.global.contact }));
      }
    }).catch(console.error);
  }, []);`;

code = code.replace(staticStateRegex, newState);

// 3. Replace all variable bindings
code = code.replace(/contactData\.office\.mapUrl/g, 'contactData.mapLinkUrl');
code = code.replace(/contactData\.office\.title/g, 'contactData.addressTitle');
code = code.replace(/contactData\.office\.address/g, 'contactData.addressDesc');

// For emails array, the original code had:
// const emails = [ { email: contactData.emails.info.email, ... } ]
// Wait, the original code mapped emails. Let's see how emails were defined.
// Actually, let's just replace the emails array definition.
const emailsRegex = /const emails = \[[\s\S]*?\];/;
const newEmails = `const emails = [
    { email: contactData.email1, description: contactData.email1Subtitle },
    { email: contactData.email2, description: contactData.email2Subtitle }
  ];`;
code = code.replace(emailsRegex, newEmails);

// Update map embed URL
// The original map embed was `src={contactData.mapEmbed}`
code = code.replace(/contactData\.mapEmbed/g, 'contactData.mapEmbedUrl');

// Update header subtitle if it was hardcoded!
// <motion.p ...>Potential Clients, Investors, and Sponsors can email or fill the form below</motion.p>
// Let's replace the hardcoded subtitle with email1Subtitle just in case? Or maybe they just wanted the design layout. Let's keep it as is, or use email1Subtitle. Let's leave it, the user only asked to restore the design.

fs.writeFileSync('src/pages/Entertainment/EntertainmentContact.jsx', code);
console.log('Restored layout with dynamic data');
