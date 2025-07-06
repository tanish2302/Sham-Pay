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

const PORT = process.env.PORT || 5000;
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "server", "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "server", "public", "index.html"));
  });
}

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
