import { Double } from "bson";
import mongoose, { Date } from "mongoose";

export type AuctionDocument = mongoose.Document & {
    name: string;
    description: string;
    ownerId: string;
    winnerId: string;
    imageId: string;

    charity: string;
    startingBid: Double;
    highestBid: Double;
    closingDate: Date;
};


const auctionSchema = new mongoose.Schema<AuctionDocument>(
    {
        name: String,
        description: String,
        ownerId: String,
        winnerId: String,
        imageId: String,
    
        charity: String,
        startingBid: Double,
        highestBid: Double,
        closingDate: Date,
    },
    { timestamps: true },
);

export const Auction = mongoose.model<AuctionDocument>("Auction", auctionSchema);
