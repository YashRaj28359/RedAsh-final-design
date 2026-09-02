const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const target = `      default:
        return (
          <div className="section-header">
            <h1>Select a Section</h1>
          </div>
        );`.replace(/\n/g, '\r\n');

const replace = `      case 'homepage-media':
        return (
          <div className="section-header">
            <h1>Media Cards</h1>
            <p>Manage the news and press cards</p>
          </div>
        );
      default:
        return (
          <div className="section-header">
            <h1>Select a Section</h1>
          </div>
        );`.replace(/\n/g, '\r\n');

if (code.includes(target)) {
    code = code.replace(target, replace);
    fs.writeFileSync('App.jsx', code);
    console.log('Sidebar updated');
} else {
    console.log('Target not found');
}
