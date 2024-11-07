import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ success: true });
});
const PORT = process.env.PORT || 4321


app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
