"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var controller = require("../controllers/todoController");
router.route("/").get(controller.home).post(controller.createTodo);
router.route("/edit/:id").get(controller.getTodo).post(controller.updateTodo);
router.route("/remove/:id").delete(controller.deleteTodo);
module.exports = router;
