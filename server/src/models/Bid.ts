import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type BidDocument = mongoose.Document & {
  auctionId: string;
  bidderId: string;
  bidAmount: Double;
};

const bidSchema = new mongoose.Schema<BidDocument>(
  {
    auction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
      required: true,
    },
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model<BidDocument>("Bid", bidSchema);
