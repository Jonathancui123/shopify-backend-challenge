import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { expect } from "chai";

describe("User routes", () => {
  beforeAll(async () => {
    console.log(global);
    await mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });
});

describe("POST /users", () => {
  it("should create the user and then redirect to landing", () => {
    return request(app)
      .post("/users")
      .field("email", "jonathancui@gmail.com")
      .field("password", "password123")
      .field("confirmPassword", "password123")
      .expect("Location", "/")
      .expect(302);
  });

  it("should redirect to the signup if the user already exists", () => {
    return request(app)
      .post("/users")
      .field("email", "jonathancui@gmail.com")
      .field("password", "password123")
      .field("confirmPassword", "password123")
      .expect("Location", "/signup")
      .expect(302);
  });
});

describe("GET /users/currentUser", () => {
  it("should get the user information", () => {
    return request(app).get("/users/currentUser").expect(302);
  });
});
