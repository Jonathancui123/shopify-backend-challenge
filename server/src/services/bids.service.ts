import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { CallbackError, NativeError } from "mongoose";
import { Bid, BidDocument } from "../models/Bid";
import { Auction } from "../models/Auction";
import logger from "../util/logger";

export const createBid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { auction, bidder, bidAmount } = req.body;

  const bid = new Bid({
    auction,
    bidder,
    bidAmount,
  });

  const { highestBid: highestBidAmount } = await Auction.findById(
    auction
  ).populate("highestBid");

  if (highestBidAmount && highestBidAmount > bidAmount) {
    throw "Invalid bid amount";
  }

  bid.save((err) => {
    if (err) {
      return next(err);
    }

    Auction.findOneAndUpdate(
      { _id: auction },
      { $push: { bids: bid._id }, highestBid: bid._id },
      {},
      (err, document, result) => {
        if (err) {
          return next(err);
        }
        User.findOneAndUpdate(
          { _id: bidder },
          { $push: { bids: bid._id } },
          {},
          (err, document, result) => {
            if (err) {
              return next(err);
            }
            res.status(200).send(bid);
          }
        );
      }
    );
  });
};
