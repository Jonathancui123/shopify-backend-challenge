import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { expect } from "chai";

describe("Auctions routes", () => {
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

describe("POST /auctions", () => {
  it("should create an auction", () => {});
});
