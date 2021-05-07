import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type BidDocument = mongoose.Document & {
    auctionId: string;
    bidderId: string;
    bidAmount: Double;
};


const bidSchema = new mongoose.Schema<BidDocument>(
    {
        auctionId: String,
        bidderId: String,
        bidAmount: Double,
    },
    { timestamps: true },
);

export const Bid = mongoose.model<BidDocument>("Bid", bidSchema);
