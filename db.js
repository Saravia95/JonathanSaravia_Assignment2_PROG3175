const sqlite3 = require("sqlite3").verbose();
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://knwvycfxqygrfrjolaca.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3Z5Y2Z4cXlncmZyam9sYWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE4NTMsImV4cCI6MjA0ODEzNzg1M30.We7NYavXlsVwZNjSALS54oSDHjr7NlPYM1-PDaZuUP4"
);

const { data, error } = await supabase.from("greetings").select();
const db = data;

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
