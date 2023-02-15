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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const itemModel_1 = require("./model/itemModel");
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect('mongodb://gireesh:gireesh123@167.235.135.56:31120/task')
    .then(() => {
    console.log('successfully connected to items collection');
})
    .catch((e) => console.log(e));
app.post('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = new itemModel_1.Item(req.body);
        const result = yield item.save();
        res.status(201).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
app.get('/api/v1/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield itemModel_1.Item.findById(req.params.id);
        if (!item) {
            res.status(404).send({ message: 'Item not found' });
            return;
        }
        res.status(200).send(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
app.put('/api/v1/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield itemModel_1.Item.findById(req.params.id);
        if (!item) {
            res.status(404).send({ message: 'Item not found' });
            return;
        }
        Object.assign(item, req.body);
        const result = yield item.save();
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
app.delete('/api/v1/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield itemModel_1.Item.deleteOne({ _id: req.params.id });
        res.status(204).send({ message: 'Item Deleted Successfully', result });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield itemModel_1.Item.find();
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}));
app.listen(3000, () => {
    console.log('Server started ❤️ on port 3000');
});
module.exports = app;
//# sourceMappingURL=app.js.map