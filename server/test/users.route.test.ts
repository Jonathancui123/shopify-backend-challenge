import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import superagent from "superagent";
import { expect } from "chai";
import signup from "./signup";

describe("Mongo connect", () => {
  beforeAll(async () => {
    console.log(global);
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
  });
});

// describe("POST /users", () => {
//   it("should create the user and then redirect to landing", () => {
//     const test = request(app);
//     return request(app)
//       .post("/users")
//       .field("email", "jonathancui@gmail.com")
//       .field("password", "password123")
//       .field("confirmPassword", "password123")
//       .expect("Location", "/")
//       .expect(302);
//   });

//   it("should redirect to the signup if the user already exists", () => {
//     return request(app)
//       .post("/users")
//       .field("email", "jonathancui@gmail.com")
//       .field("password", "password123")
//       .field("confirmPassword", "password123")
//       .expect("Location", "/signup")
//       .expect(302);
//   });
// });

describe("GET /users/currentUser", () => {
  let agent = superagent.agent();
  beforeEach((done) => {
    signup(request(app), (loggedInAgent) => {
      agent = loggedInAgent;
      done();
    });
  });
  it("should get the user information", (done) => {
    var req = request(app).get("/users/currentUser");
    (agent as any).attachCookies(req);
    req.expect(200, done);
  });
});


