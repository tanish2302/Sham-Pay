const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

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
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "server", "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "server", "public", "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on PORT ${PORT}`);
});
