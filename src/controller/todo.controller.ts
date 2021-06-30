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
    res.render("todoView.ejs", { todoTasks: tasks });
  };

  public getATodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const todo = await this.todoService.getATodo(Number(id));
  };

  public create = async (req: Request, res: Response) => {
    const task = req.body as TodoEntity;
    const newTodo = await this.todoService.create(task);

    res.send(newTodo);
  };

  public update = async (req: Request, res: Response) => {
    const task = req.body as TodoEntity;
    const id = req.params.id;

    res.send(this.todoService.update(task, Number(id)));
  };

  public delete(req: Request, res: Response) {
    const id = req.params.id;
    res.send(this.todoService.delete(Number(id)));
  }

  /**
   * Configure routes for controller
   */

  public routes(): void {
    this.router
      .get("/", this.index)
      .post("/", this.create)
      .put("/:id", this.update)
      .delete("/:id", this.delete);
  }
}
