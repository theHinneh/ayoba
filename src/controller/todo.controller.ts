import { Router, Response, Request } from "express";
import { TodoEntity } from "../database/entities/todo.entity";
import { TodoService } from "../services/todo.service";

export class TodoController {
  public router: Router;
  private todoService: TodoService;

  constructor() {
    this.router = Router();
    this.todoService = new TodoService();
    this.routes();
  }

  public index = async (req: Request, res: Response) => {
    const tasks = await this.todoService.index();
    console.log(tasks);
    const task = new TodoEntity();
    console.log(task);

    res.render("todoView.ejs", { todoTasks: tasks });
  };

  public getATodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await this.todoService.getATodo(Number(id));
    res.render("todoEdit.ejs", { todoTask: todo, idTask: id });
  };

  public create = async (req: Request, res: Response) => {
    const task = req.body as TodoEntity;
    task.date = new Date()
    const newTodo = await this.todoService.create(task);

    console.log("newTodo", newTodo);

    // res.send(newTodo);
    res.redirect("/");
  };

  public update = async (req: Request, res: Response) => {
    const task = req.body as TodoEntity;
    const id = req.params.id;
    await this.todoService.update(task, Number(id));
    res.redirect("/");
  };

  public delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.todoService.delete(Number(id));
    res.redirect("/");
  };

  /**
   * Configure routes for controller
   */

  public routes(): void {
    this.router.get("/", this.index).post("/", this.create);
    this.router.get("/edit/:id", this.getATodo).post("/edit/:id", this.update);
    this.router.get("/remove/:id", this.delete);
  }
}
