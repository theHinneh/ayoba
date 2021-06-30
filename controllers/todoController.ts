const TodoTask = require("../models/todoModel");
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Todo } from '../entities/Todo'


exports.home = async (req: Request, res: Response, next: NextFunction) => {
  /**
   * Mongoose sample
   * 
   * TodoTask.find({}, (err, tasks) => {
   * console.log(tasks)
   * res.render("todoView.ejs", { todoTasks: tasks });
   * });
   * 
   */


  /**
   * postgress with typeorm
   */
  const tasks = await getRepository(Todo).find();
  res.render("todoView.ejs", { todoTasks: tasks });
};

exports.createTodo = async (req: Request, res: Response, next: NextFunction) => {
  const todoTask = new TodoTask({
    content: req.body.content,
    date: new Date()
  });
  /**
   * Mongoose sample
   * try {
   * await todoTask.save();
   * res.redirect("/");
   * } catch {
   * res.redirect("/");
   * }
   */

  /**
   * postgress with typeorm
   */
  try {
    await getRepository(Todo).save(todoTask)
    res.redirect("/");
  } catch (error) {
    res.redirect("/");
  }

};

exports.getTodo = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  /**
   * Mongoose sample
   * TodoTask.find({}, (err, tasks) => {
   * res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
   * }
   */

  /**
   * postgress with typeorm
   */
  const task = await getRepository(Todo).findOne(id)
  res.render("todoEdit.ejs", { todoTasks: task, idTask: id });
};

exports.updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  /**
   * Mongoose sample
   * TodoTask.findByIdAndUpdate(id, { content: req.body.content }, (err: any) => {
   * if (err) return res.status(500).send(err);
   * res.redirect("/");
   * }
   */

  /**
   * postgress with typeorm
   */
  try {
    const task: any = await getRepository(Todo).find({ where: { id } })
    task.content = req.body.content
    task.date = new Date()
    await getRepository(Todo).save(task)
  } catch (error) {
    res.redirect("/");
  }
};

exports.deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  /**
   * Mongoose sample
   * TodoTask.findByIdAndRemove(id, (err: any) => {
   * if (err) return res.status(500).send(err);
   * res.redirect("/");
   * }
   */

  /**
   * postgress with typeorm
   */

  try {
    const task: any = await getRepository(Todo).find({ where: { id } })
    await getRepository(Todo).delete(task)
  } catch (error) {
    res.redirect("/");
  }
};
