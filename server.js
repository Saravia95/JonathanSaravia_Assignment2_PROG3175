const express = require("express");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
require("pg"); // explicitly require the "pg" module
const Sequelize = require("sequelize");
const app = express();
const port = 3000;
const dbPath = path.resolve(__dirname, "greetings.db");
//const db = require("./db.js");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://knwvycfxqygrfrjolaca.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtud3Z5Y2Z4cXlncmZyam9sYWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjE4NTMsImV4cCI6MjA0ODEzNzg1M30.We7NYavXlsVwZNjSALS54oSDHjr7NlPYM1-PDaZuUP4"
);

app.use(express.json());

// app.set("views", __dirname + "/views");
// app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  await res.send("Jonathan Saravia");
});

app.post("/greet", async (req, res) => {
  const { timeOfDay, language, tone } = req.body;
  const greetingTone = tone || "Formal";

  // Query Supabase to fetch the greeting message
  const { data, error } = await supabase
    .from("greetings")
    .select("greetingMessage")
    .eq("timeOfDay", timeOfDay)
    .eq("language", language)
    .eq("tone", greetingTone)
    .single();

  if (error) {
    res.status(500).json({ error: "Database error" });
  } else if (data) {
    res.json({ greetingMessage: data.greetingMessage });
  } else {
    res.status(404).json({ error: "Greeting not found" });
  }
});

app.get("/timeofday", async (req, res) => {
  const { data, error } = await supabase.from("greetings").select("timeofday");

  res.json(data.map((row) => row.timeofday));
});

app.get("/languages", async (req, res) => {
  const { data, error } = await supabase.from("greetings").select("language");

  res.json(data.map((row) => row.language));
});

app.listen(port, () => {
  console.log(`Server now running at http://localhost:${port}`);
});

module.exports = app;
