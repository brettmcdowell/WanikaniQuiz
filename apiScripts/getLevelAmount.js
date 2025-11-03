import dotenv from "dotenv";
dotenv.config();

async function getLevels() {
  const url = "https://api.wanikani.com/v2/level_progressions";
  try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.WANIKANI_API_KEY}`,
            "Wanikani-Revision": `${process.env.WANIKANI_REVISION}`,
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}