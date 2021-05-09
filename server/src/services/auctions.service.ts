import { Request, Response, NextFunction } from "express";
import { check, sanitize, validationResult } from "express-validator";
import { NativeError } from "mongoose";
import { Auction, AuctionDocument } from "../models/Auction";
import { UserDocument } from "../models/User";

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
  imageSrc: string
): Promise<AuctionDocument> => {
  const ownerId = (req.user as UserDocument).id;
  const auction = new Auction({
    name: req.body.name,
    description: req.body.description,
    ownerId,
    imageSrc,

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
  } catch (err) {
    if (err) {
      res.status(500);
      throw Error("Database query error");
    }
  }

  return auction;
};
