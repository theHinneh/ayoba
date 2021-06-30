import * as express from "express";
const router = express.Router();
const controller = require("../controllers/todoController");

router.route("/").get(controller.home).post(controller.createTodo);
router.route("/edit/:id").get(controller.getTodo).post(controller.updateTodo);
router.route("/remove/:id").delete(controller.deleteTodo);

module.exports = router;
