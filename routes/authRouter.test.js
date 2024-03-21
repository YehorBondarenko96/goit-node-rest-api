import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test /login route", () => {
    let server = null;

    beforeAll(async () => {
            await mongoose.connect(TEST_DB_HOST);
            server = app.listen(PORT);
    });

    afterAll(async () => {
            await mongoose.disconnect();
            server.close();
    });

    test("test /login with valid data", async () => {
        const loginData = {
            email: "b@gmail.com",
            password: "bbj"
        };

        const { statusCode } = await request(app).post("/auth/users/login").send(loginData);
        expect(statusCode).toBe(201);
    });
});
