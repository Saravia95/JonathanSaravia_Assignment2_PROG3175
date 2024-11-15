const express = require("express");
const db = require("./db");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/greet", (req, res) => {
  const { timeOfDay, language, tone } = req.body;
  const greetingTone = tone || "Formal";
  db.get(
    `SELECT greetingMessage FROM greetings WHERE timeOfDay = ? AND language = ? AND tone = ?`,
    [timeOfDay, language, greetingTone],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else if (row) {
        res.json({ greetingMessage: row.greetingMessage });
      } else {
        res.status(404).json({ error: "Greeting not found" });
      }
    }
  );
});

app.get("/api/timesOfDay", (req, res) => {
  db.all(`SELECT DISTINCT timeOfDay FROM greetings`, [], (err, rows) => {
    if (err) res.status(500).json({ error: "Database error" });
    else res.json(rows.map((row) => row.timeOfDay));
  });
});

app.get("/api/languages", (req, res) => {
  db.all(`SELECT DISTINCT language FROM greetings`, [], (err, rows) => {
    if (err) res.status(500).json({ error: "Database error" });
    else res.json(rows.map((row) => row.language));
  });
});

app.listen(port, () => {
  console.log(`Server now running at http://localhost:${port}`);
});
