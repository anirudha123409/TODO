const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/todo/getRequest", async (req, res) => {
  try {
    const { todos } = await fetch("https://dummyjson.com/todos").then((res) =>
      res.json()
    );
    let todoList = {};
    for (let task of todos) {
      todoList[task.todo] = task.completed;
    }
    // throw Error('test');
    res.json(todoList);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/todo/get/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { todos } = await fetch(
      `https://dummyjson.com/todos/user/${id}`
    ).then((res) => res.json());
    let todoList = {};
    for (let task of todos) {
      todoList[task.todo] = task.completed;
    }
    res.json(todoList);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.post("/todo/postRequest", async (req, res) => {
  try {
    const newUser = req.body;

    const result = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).then((res) => res.json());

    if (result && result.id && result.userId) {
      res.status(200).send({ message: "Data received successfully" });
    } else {
      res.status(400).send({ message: "Invalid Data received" });
    }
  } catch (error) {
    console.error("Error while creating a todo:", error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.put("/todo/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const result = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((res) => res.json());

    res.send(result);
  } catch (error) {
    console.error("Error while updating a todo:", error);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (result && result.isDeleted == true) {
      res.status(200).send({ message: "Deleted successfully" });
    } else {
      res.status(400).send({ message: "Error in Deleting" });
    }
  } catch (error) {
    console.error("Error while deleting a todo:", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
