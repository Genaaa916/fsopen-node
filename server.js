import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import getNumbers from "./routes/persons.js";

const app = express();

export const persons = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2,
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3,
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4,
    },
  ],
};

app.use(bodyParser.json());
// app.use(cors());
app.use(cors());

app.use("/persons", getNumbers);

app.get("/", (req, res) => {
  res.send("Hello to Number API");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
