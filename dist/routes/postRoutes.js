"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.get('/posts', postController_1.getAll);
router.get('/post/:id', postController_1.getOne);
router.post('/posts', middleware_1.authenticateToken, postController_1.create);
router.put('/post/:id', middleware_1.authenticateToken, postController_1.edit);
router.delete('/post/:id', middleware_1.authenticateToken, postController_1.remove);
exports.default = router;
