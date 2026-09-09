import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsPath = path.join(__dirname, '../client/src/data/blogs.json');
const uploadsDir = path.join(__dirname, 'uploads', 'blogs');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Read the blogs JSON file
let blogsData;
try {
  blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
} catch (err) {
  console.error("Failed to read blogs.json:", err);
  process.exit(1);
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const processBlogs = async () => {
  let updated = false;
  for (let blog of blogsData) {
    if (blog.imageUrl && blog.imageUrl.startsWith('http')) {
      const url = new URL(blog.imageUrl);
      const filename = path.basename(url.pathname);
      const localFilePath = path.join(uploadsDir, filename);
      
      console.log(`Downloading ${filename}...`);
      try {
        await downloadImage(blog.imageUrl, localFilePath);
        console.log(`Downloaded ${filename} successfully.`);
        blog.imageUrl = `/uploads/blogs/${filename}`;
        updated = true;
      } catch (err) {
        console.error(`Failed to download ${filename}:`, err.message);
      }
    }
  }

  if (updated) {
    fs.writeFileSync(blogsPath, JSON.stringify(blogsData, null, 2), 'utf8');
    console.log("Updated blogs.json with local image paths.");
  } else {
    console.log("No new images downloaded.");
  }
};

processBlogs();
