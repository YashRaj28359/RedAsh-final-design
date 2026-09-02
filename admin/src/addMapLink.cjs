const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

// The default contact info block
const contactInfoTarget = `      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };`.replace(/\n/g, '\r\n');

const contactInfoReplace = `      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754702008323!2d72.83299317593922!3d19.118432350639912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bbc70d9!2sPeninsula%20Park!5e0!3m2!1sen!2sin!4v1716388437021!5m2!1sen!2sin',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };`.replace(/\n/g, '\r\n');

if (code.includes(contactInfoTarget)) {
    code = code.replace(contactInfoTarget, contactInfoReplace);
}

// The UI inputs
const mapTarget = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL</label>
              <input type="text" className="form-control" value={contactInfo.mapUrl || ''} onChange={(e) => handleChange('mapUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

const mapReplace = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Embed URL (iframe src)</label>
              <input type="text" className="form-control" value={contactInfo.mapEmbedUrl || ''} onChange={(e) => handleChange('mapEmbedUrl', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

if (code.includes(mapTarget)) {
    code = code.replace(mapTarget, mapReplace);
}

fs.writeFileSync('App.jsx', code);
console.log('App.jsx Map URLs updated!');
