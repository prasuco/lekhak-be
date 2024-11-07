import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.listen(process.env.PORT, () =>
  console.log(`server running in http://localhost:${process.env.PORT}`)
);
