const express = require("express");
const app = express();

/* =========================
   1️⃣ JS PURO (VULNERABLE)
========================= */
app.get("/js/session.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
    var sessionToken = "JS_FAKE_TOKEN_dsahdsahd1n2121jw";
  `);
});

/* =========================
   2️⃣ JSON MAL SERVIDO
   (JSON entregado como JS)
========================= */
app.get("/json/profile.js", (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
    var api_token = "JSON_FAKE_TOKEN_88xx9911";
  `);
});

/* =========================
   3️⃣ JSONP
========================= */
app.get("/jsonp/account.jsonp", (req, res) => {
  const cb = req.query.callback;
  res.setHeader("Content-Type", "application/javascript");
  res.send(`${cb}({ token: "JSONP_FAKE_TOKEN_cc33dd" });`);
});

app.listen(3000, () => {
  console.log("Vulnerable site running on http://localhost:3000");
});
