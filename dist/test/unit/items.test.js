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
const Expect = require('expect');
const request = require('supertest');
const app = require("./../../dist/src/app");
describe('Books API', () => {
    let bookId;
    it('should add a new book', () => __awaiter(void 0, void 0, void 0, function* () {
        const newBook = {
            title: 'Test Book',
            description: "Test "
        };
        const response = yield request(app)
            .post('/api/v1/items')
            .send(newBook);
        Expect(response.status).toBe(201);
        bookId = response.body._id;
    }));
    it('should get a specific book', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get(`/api/v1/items/${bookId}`);
        Expect(response.status).toBe(200);
    }));
    it('should update an existing book', () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedBook = {
            title: 'Updated Test Book',
            description: "Update Test"
        };
        const response = yield request(app)
            .put(`/api/v1/items/${bookId}`)
            .send(updatedBook);
        Expect(response.status).toBe(200);
    }));
    it('should get a list of all books', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .get('/api/v1/items');
        Expect(response.status).toBe(200);
        Expect(response.body.length).toBeGreaterThan(0);
    }));
    it('should delete an existing book', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .delete(`/api/v1/items/${bookId}`);
        Expect(response.status).toBe(204);
    }));
});
//# sourceMappingURL=items.test.js.map