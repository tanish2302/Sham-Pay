const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.json());
app.use(cors());

const dbConfig = require('./config/dbConfig');
const userRoute = require('./routes/userRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const requestsRoute = require("./routes/requestRoute");

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/requests", requestsRoute)

app.get("/", (_, res) => {
  res.send("Sham‑Pay backend running! ✅");
});

const PORT = process.env.PORT || 5000;

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // __dirname === /app/server  (inside container)
  const staticPath = path.join(__dirname, "public");
  app.use(express.static(staticPath));

  // SPA fallback
  app.get("*", (_, res) => res.sendFile(path.join(staticPath, "index.html")));
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on PORT ${PORT}`);
});
