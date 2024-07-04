const getTodos = async () => {
  const { todos } = await fetch("https://dummyjson.com/todos").then((res) =>
    res.json()
  );
  let todoList = {};
  for (let task of todos) {
    todoList[task.todo] = task.completed;
  }
  return todoList;
};

const getTodoById = async (id) => {
  const { todos } = await fetch(`https://dummyjson.com/todos/user/${id}`).then(
    (res) => res.json()
  );
  let todoList = {};
  for (let task of todos) {
    todoList[task.todo] = task.completed;
  }
  return todoList;
};

const addTodo = async (newUser) => {
  const result = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
  return result;
};

const updateTodo = async (id, update) => {
  const result = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  }).then((res) => res.json());
  return result;
};

const deleteTodo = async (id) => {
  const result = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

  return result;
};

const handleErrorResponse = (res, error, statusCode = 500) => {
  console.error("Error in CRUD action performed", error);
  res
    .status(statusCode)
    .json({ error: "Failed to perform CRUD operation on Todo List" });
};

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
  handleErrorResponse,
};
