import mongoose from "mongoose";
import dotenv from "dotenv";

//i already tried the password through the argv and it worked, now it's already set to use the .env file
dotenv.config({ path: "./.env" });

const password = process.env.MONGODB_URI;

const url = `${process.env.MONGODB_URI}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Mary PPP",
  number: "553323",
  id: 23232,
});

person.save().then(() => {
  console.log("person saved!");
  mongoose.connection.close();
});
