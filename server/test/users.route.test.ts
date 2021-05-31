import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import superagent from "superagent";
import { expect } from "chai";
import signup from "./signup";
import { before } from "lodash";

let agent = superagent.agent();

const user = {
  firstName: "Tester",
  lastName: "McTest",
  email: "test@gmail.com",
};

describe("Users routes", () => {
  beforeAll((done) => {
    console.log(global);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then((val) => {
        done();
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      });
  });

  beforeEach((done) => {
    signup(request(app), (loggedInAgent) => {
      agent = loggedInAgent;
      done();
    });
  });

  describe("GET /users/currentUser", () => {
    it("should get the user information", (done) => {
      var req = request(app).get("/users/currentUser");
      (agent as any).attachCookies(req);
      req
        .expect((res) => {
          expect(res.body).to.contain(user);
        })
        .expect(200, done);
    });
  });

  describe("GET /users/currentUser/auctions", () => {
    it("should get a list of the users auctions", (done) => {
      var req = request(app).get("/users/currentUser/auctions");
      (agent as any).attachCookies(req);
      req
        .expect((res) => {
          expect(res.body).to.be.empty;
        })
        .expect(200, done);
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
