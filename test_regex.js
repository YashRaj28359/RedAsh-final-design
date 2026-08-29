const extractYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

console.log('1:', extractYouTubeId('https://youtu.be/orDnxqWvijU'));
console.log('2:', extractYouTubeId('https://www.youtube.com/watch?v=plv7FFKm318&t=7s'));
console.log('3:', extractYouTubeId('https://youtu.be/Rz0EI0ooOwM?si=VrpkUvzjQBYdCcov'));
