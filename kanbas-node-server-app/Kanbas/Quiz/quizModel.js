import mongoose from "mongoose";
import schema from "./schema.js";
const quizModel = mongoose.model("QuizzSchema", schema);
export default quizModel;