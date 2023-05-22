import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import Person from "./mongoose.js";

const app = express();

const isFalsy = (value) => !value;

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url: :status :body - :response-time ms"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", async (req, res) => {
  try {
    res.status(200).send(await Person.find({}));
  } catch (err) {
    res.status(404).send({ message: "Not found" });
  }
});

app.get("/api/info", (req, res) => {
  const time = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.persons.length} people</p><p>${time}</p>`
  );
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findById(id);
    res.status(200).send(person);
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Not found" });
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndDelete(id);
    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    res.status(404).send({ message: "Not found" });
  }
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;
  const nameExists = await Person.find({ name: body.name });
  const [message, code] = nameExists.length
    ? ["Name already exists", 409]
    : !body.name || !body.number
    ? ["Name or number missing", 400]
    : ["Created", 201];
  console.log(message, code);
  code === 201 &&
    (await Person.create({
      name: body.name,
      number: body.number,
    }));

  res.status(code).send({ message });
});

app.put("/api/persons/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    await Person.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Updated" });
  } catch (err) {
    res.status(404).send({ message: "Not found" });
  }
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
