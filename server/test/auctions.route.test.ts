import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { expect } from "chai";

describe("Auctions routes", () => {
  beforeAll((done) => {
    console.log(global);
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        done();
      });
  });
});

describe("POST /auctions", () => {
  it("should create an auction", () => {});
});
