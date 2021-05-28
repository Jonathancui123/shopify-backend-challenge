import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type AuctionDocument = mongoose.Document & {
  name: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  winner: mongoose.Schema.Types.ObjectId;
  imageSrc: string;
  bids: Array<mongoose.Schema.Types.ObjectId>;
  charity: string;
  startingBid: number;
  highestBid: number;
  closingDate: Date;
};

const auctionSchema = new mongoose.Schema<AuctionDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageSrc: {
      type: String,
      required: true,
    },

    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],

    // need and array of bids
    highestBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    }, // should be a ref to the highest bid

    charity: {
      type: String,
      required: true,
    },
    startingBid: {
      type: Number,
      required: true,
    },
    closingDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Auction = mongoose.model<AuctionDocument>(
  "Auction",
  auctionSchema
);
