const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const meme = JSON.parse(event.body);
    const memesPath = path.join(__dirname, '..', '..', 'memes.json');
    const memesData = JSON.parse(fs.readFileSync(memesPath, 'utf-8'));

    memesData.memes.push(meme);
    fs.writeFileSync(memesPath, JSON.stringify(memesData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message }),
    };
  }
};
