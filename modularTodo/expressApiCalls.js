const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// import { getTodos, getTodoById, addTodo, updateTodo, deleteTodo } from './dummyApiCalls'
const {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
  handleErrorResponse,
} = require("./dummyApiCalls");

app.get("/todo/getRequest", async (req, res) => {
  try {
    const todoList = await getTodos();
    throw Error("test");
    res.json(todoList);
  } catch (error) {
    handleErrorResponse(res, error, 400);
  }
});

app.get("/todo/get/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const todoList = await getTodoById(id);

    throw Error("test");

    res.json(todoList);
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

app.post("/todo/postRequest", async (req, res) => {
  try {
    const newUser = req.body;

    const result = await addTodo(newUser);

    if (result && result.id && result.userId) {
      res.status(200).send({ message: "Data received successfully" });
    } else {
      res.status(400).send({ message: "Invalid Data received" });
    }
  } catch (error) {
    handleErrorResponse(res, error, 400);
  }
});

app.put("/todo/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await updateTodo(id, update);

    res.send(result);
  } catch (error) {
    handleErrorResponse(res, error, 400);
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await deleteTodo(id);

    if (result && result.isDeleted == true) {
      res.status(200).send({ message: "Deleted successfully" });
    } else {
      res.status(400).send({ message: "Error in Deleting" });
    }
  } catch (error) {
    handleErrorResponse(res, error);
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
