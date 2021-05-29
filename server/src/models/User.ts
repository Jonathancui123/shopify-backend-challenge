import bcrypt from "bcrypt-nodejs";
import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;

  profile: {
    firstName: string;
    lastName: string;
  };

  bids: Array<mongoose.Schema.Types.ObjectId>;
  auctions: Array<mongoose.Schema.Types.ObjectId>;
  comparePassword: comparePasswordFunction;
};

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    // should have a ref to auctions and bids
    profile: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    auctions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auction" }],
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
