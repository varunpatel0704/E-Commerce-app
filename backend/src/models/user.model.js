import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, "address is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  state: {
    type: String,
    required: [true, "state is required"],
  },
  pincode: {
    type: Number,
    required: [true, "pincode is required"],
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: 'generate a random user',
      required: [true, "fullName is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      unique: [true, "email already registered"],
      required: [true, "email is required"],
      lowercase: true,
      index: true
    },
    phoneNumber: {
      type: Number,
      // unique: [true, "phone number already registered"],
      // required: [true, "phone number is required"],
    },
    DOB: {
      type: Date,
      // required: [true, "DOB is required"],
    },
    role: {
      type: String,
      // required: [true, "role is required"],
      enum: ["user", "admin"],
      default: "user",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        // required: true,
      },
    ],
    gender: {
      type: String,
      default: 'Not provided'
    },
    avatar: String,
    shippingAddress: addressSchema,
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Error hashing the password using bcrypt: ", err);
  }
});

userSchema.methods.validatePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(
      "Error matching the password using bcrypt.compare method: ",
      error
    );
  }
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
}

const User = mongoose.model("User", userSchema);

export default User;
