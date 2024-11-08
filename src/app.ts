import express from "express";

import dotenv from "dotenv";
import { authRouter } from "./routes/auth";
const app = express();

app.use(express.json())


dotenv.config();
const PORT = process.env.PORT || 4321;

app.get("/health", (req, res) => {
  res.json({ success: true });
});

// registering auth router
app.use('/api/auth',authRouter)



app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
