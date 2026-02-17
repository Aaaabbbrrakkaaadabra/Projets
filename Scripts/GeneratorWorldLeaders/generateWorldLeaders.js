const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://en.wikipedia.org/wiki/List_of_current_heads_of_state";

async function main() {
  console.log("⏳ Récupération de la page Wikipedia...");

  const { data } = await axios.get(URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });

  const $ = cheerio.load(data);

  const presidents = [];

  $("table.wikitable").each((i, table) => {
    $(table)
      .find("tr")
      .each((j, row) => {
        const cells = $(row).find("td");
        if (cells.length >= 2) {
          const country = $(cells[0]).text().trim();
          const leaderCell = $(cells[1]);

          const name =
            leaderCell.find("a").first().text().trim() ||
            leaderCell.text().trim();

          // GARDER UNIQUEMENT les présidents
          const roleText = leaderCell.text().toLowerCase();
          if (!roleText.includes("")) return;

          // Début mandat si indiqué
          let createdAtMatch = leaderCell.text().match(/(\d{4})/);
          const createdAt = createdAtMatch ? `${createdAtMatch[1]}-01-01` : "";

          // Parti politique si indiqué
          let partyMatch = leaderCell.text().match(/\(([^)]+party[^)]*)\)/i);
          let party = partyMatch ? partyMatch[1] : "Indépendant / Inconnu";

          // Photo si dispo
          let photoUrl = leaderCell.find("img").attr("src") || "";
          if (photoUrl && !photoUrl.startsWith("http")) {
            photoUrl = "https:" + photoUrl;
          }

          presidents.push({
            bestVotes: 0,
            worstVotes: 0,
            country,
            createdAt,
            name,
            party,
            photoUrl,
            role: "Président",
          });
        }
      });
  });

  console.log(`✅ ${presidents.length} présidents récupérés`);

  fs.writeFileSync(
    "presidentsWikipedia2026.json",
    JSON.stringify(presidents, null, 2),
    "utf8"
  );
  console.log("📁 Fichier presidentsWikipedia2026.json généré !");
}

main().catch(console.error);
