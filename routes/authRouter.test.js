import mongoose from "mongoose";
import request from "supertest";
import app from "../app.js";

const { TEST_DB_HOST, TEST_PORT = 3000 } = process.env;

describe("test /login route", () => {
    let server = null;

    beforeAll(async () => {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(TEST_DB_HOST);
    }
    server = app.listen(TEST_PORT);
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

        const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
        expect(statusCode).toBe(200);
        expect(body).toHaveProperty("token");
        expect(typeof body.token).toBe("string");
        expect(body).toHaveProperty("user");
        expect(typeof body.user.email).toBe("string");
        expect(typeof body.user.subscription).toBe("string");
    });

    test("test /login with invalid email", async () => {
        const loginData = {
            email: "bz@gmail.com",
            password: "bbj"
        };

        const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
        expect(statusCode).toBe(401);
        expect(body.message).toBe("Email or password not wrong");
    });

    test("test /login with invalid password", async () => {
        const loginData = {
            email: "b@gmail.com",
            password: "bbjz"
        };

        const { statusCode, body } = await request(app).post("/api/users/login").send(loginData);
        expect(statusCode).toBe(401);
        expect(body.message).toBe("Email or password not wrong");
    });
});
