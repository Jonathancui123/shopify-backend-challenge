import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type AuctionDocument = mongoose.Document & {
  name: string;
  description: string;
  ownerId: string;
  winnerId: string;
  imageSrc: string;

  charity: string;
  startingBid: number;
  highestBid: number;
  closingDate: Date;
};

const auctionSchema = new mongoose.Schema<AuctionDocument>(
  {
    name: String,
    description: String,
    ownerId: String, // should be a ref to owner
    winnerId: String, // should be a ref to the winner
    imageSrc: String,

    // need and array of bids
    charity: String,
    startingBid: Number,
    highestBid: Number, // should be a ref to the highest bid
    closingDate: Date,
  },
  { timestamps: true }
);

export const Auction = mongoose.model<AuctionDocument>(
  "Auction",
  auctionSchema
);
