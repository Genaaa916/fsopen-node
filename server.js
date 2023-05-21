import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

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
const randomId = () => Math.floor(Math.random() * 1000000);
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url: :status :body - :response-time ms"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/info", (req, res) => {
  const time = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.persons.length} people</p><p>${time}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.persons.find((person) => person.id === id);
  person ? res.send(person) : res.status(404).send();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons.persons = persons.persons.filter((person) => person.id !== id);
  res.status(200).send({ message: "Deleted" });
});
app.post("/api/persons", (req, res) => {
  const body = req.body;
  const nameExists = persons.persons.find(
    (person) => person.name === body.name
  );
  nameExists &&
    res.status(400).send({ error: "Person already exists" })(
      !body.name || !body.number
    ) &&
    res.status(400).send({ error: "Name or number missing" });

  const person = {
    name: body.name,
    number: body.number,
    id: randomId(),
  };
  persons.persons = [...persons.persons, person];
  res.status(200).send(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
