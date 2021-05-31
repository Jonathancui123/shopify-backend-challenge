import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { Auction, AuctionDocument } from "../models/Auction";
import { User, UserDocument } from "../models/User";
import logger from "../util/logger";

export const validateCreateAuctionInput = async (
  req: Request,
  res: Response
): Promise<any> => {
  // TODO: Validate the input for creating an auction
  return {};
};

export const createAuction = async (
  req: Request,
  res: Response,
  imageSrc: string,
  baseFileName: string
): Promise<AuctionDocument> => {
  const ownerId = (req.user as any).id;
  const auction = new Auction({
    name: req.body.name,
    description: req.body.description,
    owner: ownerId,
    imageSrc,
    baseFileName,
    charity: req.body.charity,
    startingBid: req.body.startingBid,
    closingDate: req.body.closingDate,
  });

  try {
    const existingAuction = await Auction.findOne({
      name: req.body.name,
      ownerId,
    });

    if (existingAuction) {
      res.status(400);
      throw Error("Auction with name already exists for user");
    }
    await auction.save();

    User.findOneAndUpdate(
      { _id: ownerId },
      { $push: { auctions: auction._id } },
      {}
    );
  } catch (err) {
    if (err) {
      res.status(500);
      throw Error(err);
    }
  }

  return auction;
};

export const getAllAuctions = async () => {
  const filter = {};
  const allAuctions = await Auction.find(filter)
    .sort("-createdAt")
    .populate("highestBid")
    .populate("owner");

  return allAuctions;
};

export const getMyAuctions = async (userId: string) => {
  const myAuctions = await User.findById(userId)
    .populate({
      path: "auctions",
      populate: {
        path: "bids",
        model: "Bid",
      },
    })
    .select("auctions -_id");
  return myAuctions.auctions as unknown as Array<AuctionDocument>;
};
