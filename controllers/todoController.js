const TodoTask = require("../models/todoModel");

exports.home = async (req, res, next) => {
  TodoTask.find({}, (err, tasks) => {
    console.log(tasks)
    res.render("todoView.ejs", { todoTasks: tasks });
  });
};

exports.createTodo = async (req, res, next) => {
  const todoTask = new TodoTask({
    content: req.body.content,
  });
  try {
    await todoTask.save();
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }
  console.log(req.body);
};

exports.getTodo = async (req, res, next) => {
  const id = req.params.id;
  TodoTask.find({}, (err, tasks) => {
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
  });
};

exports.updateTodo = async (req, res, next) => {
  const id = req.params.id;
  TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
};

exports.deleteTodo = async (req, res, next) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
};
