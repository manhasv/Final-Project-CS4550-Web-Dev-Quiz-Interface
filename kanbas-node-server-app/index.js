import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import express from "express";

const app = express();
app.use(express.json());
Hello(app);

app.listen(process.env.PORT || 4000)