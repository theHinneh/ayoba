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
    const msisdn = req.params.msisdn;
    const tasks = await this.todoService.index(msisdn);
    res.json(tasks);

    // res.render("todoView.ejs", { todoTasks: tasks });
  };

  public getATodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    // const msisdn = req.params.msisdn;
    const todo = await this.todoService.getATodo(Number(id));
    const data = { todoTask: todo, idTask: id };
    res.json(data);

    // res.render("todoEdit.ejs", { todoTask: todo, idTask: id });
  };

  public create = async (req: Request, res: Response) => {
    const msisdn = req.params.msisdn;
    const task = req.body as TodoEntity;
    task.msisdn = msisdn;
    task.date = new Date();
    const newTodo = await this.todoService.create(task);

    res.json(newTodo);
    // res.redirect("/");
  };

  public update = async (req: Request, res: Response) => {
    // const msisdn = req.params.msisdn;
    const task = req.body as TodoEntity;
    const id = req.params.id;
    const update = await this.todoService.update(task, Number(id));
    res.json(update);

    // res.redirect("/");
  };

  public delete = async (req: Request, res: Response) => {
    // const msisdn = req.params.msisdn;
    const id = req.params.id;
    await this.todoService.delete(Number(id));
    res.status(200).send("deleted");

    // res.redirect("/");
  };

  /**
   * Configure routes for controller
   */

  public routes(): void {
    this.router.get("/:msisdn", this.index).post("/:msisdn", this.create);
    this.router.get("/edit/:id", this.getATodo).post("/edit/:id", this.update);
    this.router.get("/remove/:id", this.delete);
  }
}
