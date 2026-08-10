const sharp = require('sharp');

sharp('src/assets/Films/Poster/Micro drama Movie posters/15.png')
  .webp()
  .toFile('src/assets/Films/Poster/Micro drama Movie posters/15.webp')
  .then(info => {
    console.log('Successfully converted image to WebP:');
    console.log(info);
  })
  .catch(err => {
    console.error('Error converting image:');
    console.error(err);
  });
