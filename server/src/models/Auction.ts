import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type AuctionDocument = mongoose.Document & {
  name: string;
  description: string;
  owner: mongoose.Schema.Types.ObjectId;
  winner: mongoose.Schema.Types.ObjectId;
  imageSrc: string;
  baseFileName: string;
  privateImageSrc: string;
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
    baseFileName: {
      type: String,
      required: true,
    },
    privateImageSrc: {
      type: String,
      default: "",
    },

    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],

    highestBid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },

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
