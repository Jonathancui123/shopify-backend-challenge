import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { expect } from "chai";
import superagent from "superagent";
import signup from "./signup";

let agent = superagent.agent();

const auctionInfo = {
  name: "mona lisa",
  description: "an old painting",
  charity: "some charity",
  startingBid: 5,
  closingDate: "2021-05-31",
};

describe("Auctions routes", () => {
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

  describe("POST /auctions", () => {
    it("should create a new auction and return the information", (done) => {
      var req = request(app)
        .post("/auctions")
        .field(auctionInfo)
        .attach("auction_image", "./test_image.jpg");
      (agent as any).attachCookies(req);
      req
        .expect((res) => {
          expect(res.body).to.contain(auctionInfo);
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
          expect(res.body).to.include(auctionInfo);
        })
        .expect(200, done);
    });
  });
});
