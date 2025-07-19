const fs = require("fs");
const path = require("path");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { url } = JSON.parse(event.body || "{}");
  if (!url) return { statusCode: 400, body: "No URL provided" };

  const memesPath = path.resolve(__dirname, "../../memes.json");
  let memes = [];

  try {
    memes = JSON.parse(fs.readFileSync(memesPath));
  } catch {
    memes = [];
  }

  memes.push(url);
  fs.writeFileSync(memesPath, JSON.stringify(memes, null, 2));

  return { statusCode: 200, body: "Meme added!" };
};
