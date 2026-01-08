const express = require("express");
const app = express();
const PORT = 3000;

/* CSP estricta (NO protege contra XSSI) */
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'");
  next();
});

/* Ruta base */
app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("🧪 Laboratorio de prueba XSSI - Servidor vulnerable activo");
});

/* 1️⃣ XSSI por JavaScript */
app.get("/js/session.js", (req, res) => {
  res.type("application/javascript");
  res.send(`
    // JS ejecutable vulnerable
    var sessionToken = "JS-TOKEN-12345";
  `);
});

/* 2️⃣ XSSI por JSON mal servido como JS */
app.get("/json/profile.js", (req, res) => {
  res.type("application/javascript");
  res.send(`
    var api_token = "JSON-TOKEN-67890";
  `);
});

/* 3️⃣ XSSI por JSONP */
app.get("/jsonp/account.jsonp", (req, res) => {
  const cb = req.query.callback || "callback";
  res.type("application/javascript");
  res.send(`${cb}({ token: "JSONP-TOKEN-ABCDE" });`);
});

/* Start */
app.listen(PORT, () => {
  console.log(`✅ Servidor vulnerable en http://localhost:${PORT}`);
});
