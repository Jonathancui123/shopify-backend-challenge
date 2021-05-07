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
    ownerId: String,
    winnerId: String,
    imageSrc: String,

    charity: String,
    startingBid: Number,
    highestBid: Number,
    closingDate: Date,
  },
  { timestamps: true }
);

export const Auction = mongoose.model<AuctionDocument>(
  "Auction",
  auctionSchema
);
