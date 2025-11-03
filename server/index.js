import express from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Webbanhang");
const app = express();

app.listen(8080, () => {
  console.log("Server is running!");
});
