import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Express Amin");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/user", (req, res) => {
  res.json({
    name: "John",
    age: 25,
  });
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;

  res.send(`Product ID: ${id}`);
});

app.get("/products", (req, res) => {
  console.log(req.query);

  res.json(req.query);
});

app.post("/users", (req, res) => {
  console.log(req.body);

  res.json({
    message: "User created",
    user: req.body,
  });
});

app.get("/movies/:name", (req, res) => {
  res.send(`Movie name: ${req.params.name}`);
});

app.get("/search", (req, res) => {
  res.json(req.query);
});

app.listen(3007, () => {
  console.log("Server running on port ");
});
