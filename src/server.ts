import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { TodoController } from "./controller/todo.controller";

class Server {
  private app: express.Application;
  private todoController: TodoController;

  constructor() {
    this.app = express(); // init application
    this.configuration(); // config the application
    this.todoController = new TodoController();
    this.routes();
  }

  /**
   * Method to configure the server
   */
  public configuration(): void {
    this.app.enable("trust proxy");
    this.app.use("/static", express.static("public"));
    this.app.set("view engine", "ejs");
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set("port", process.env.PORT || 3000);
  }

  /**
   * Method to configure routes
   */
  public async routes(): Promise<void> {
    this.app.use("/", this.todoController.router);
    this.app.get("/test", (req: Request, res: Response) => {
      res.send("<h1>Hello</h1>");
    });
  }

  /**
   * Method to start the server
   */
  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server is listerning from ${this.app.get("port")}`);
    });
  }
}

const server = new Server(); // create a server instance
server.start(); // start the server
