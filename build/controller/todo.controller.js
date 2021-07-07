"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
var express_1 = require("express");
var todo_service_1 = require("../services/todo.service");
var TodoController = /** @class */ (function () {
    function TodoController() {
        var _this = this;
        this.index = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var msisdn, tasks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msisdn = req.params.msisdn;
                        return [4 /*yield*/, this.todoService.index(msisdn)];
                    case 1:
                        tasks = _a.sent();
                        res.json(tasks);
                        return [2 /*return*/];
                }
            });
        }); };
        this.getATodo = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, todo, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.todoService.getATodo(Number(id))];
                    case 1:
                        todo = _a.sent();
                        data = { todoTask: todo, idTask: id };
                        res.json(data);
                        return [2 /*return*/];
                }
            });
        }); };
        this.create = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var msisdn, task, newTodo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msisdn = req.params.msisdn;
                        task = req.body;
                        task.msisdn = msisdn;
                        task.date = new Date();
                        return [4 /*yield*/, this.todoService.create(task)];
                    case 1:
                        newTodo = _a.sent();
                        res.json(newTodo);
                        return [2 /*return*/];
                }
            });
        }); };
        this.update = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var task, id, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        task = req.body;
                        id = req.params.id;
                        return [4 /*yield*/, this.todoService.update(task, Number(id))];
                    case 1:
                        update = _a.sent();
                        res.json(update);
                        return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, this.todoService.delete(Number(id))];
                    case 1:
                        _a.sent();
                        res.status(200).send("deleted");
                        return [2 /*return*/];
                }
            });
        }); };
        this.router = express_1.Router();
        this.todoService = new todo_service_1.TodoService();
        this.routes();
    }
    /**
     * Configure routes for controller
     */
    TodoController.prototype.routes = function () {
        this.router.get("/save/:msisdn", this.index).post("/save/:msisdn", this.create);
        this.router.get("/edit/:id", this.getATodo).post("/edit/:id", this.update);
        this.router.get("/remove/:id", this.delete);
    };
    return TodoController;
}());
exports.TodoController = TodoController;
