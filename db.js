const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./greetings.db", (err) => {
  if (err) console.error("Database opening error:", err);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS greetings (
      id INTEGER PRIMARY KEY,
      timeOfDay TEXT,
      language TEXT,
      greetingMessage TEXT,
      tone TEXT
    )
  `);

  const statement = db.prepare(`
    INSERT INTO greetings (timeOfDay, language, greetingMessage, tone)
    VALUES (?, ?, ?, ?)
  `);

  const greetingsData = [
    ["Morning", "English", "Good Morning!", "Formal"],
    ["Afternoon", "English", "Good Afternoon!", "Formal"],
    ["Evening", "English", "Good Evening!", "Casual"],
    ["Morning", "French", "Bonjour!", "Formal"],
    ["Afternoon", "Spanish", "Buenas tardes!", "Casual"],
  ];
  greetingsData.forEach((data) => statement.run(data));
  statement.finalize();
});

module.exports = db;
