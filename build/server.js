"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
var corsOptions = {
    origin: "http://someotherdomain.com",
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("starting app on: http://localhost:".concat(port));
});
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, users_1.default)(app);
