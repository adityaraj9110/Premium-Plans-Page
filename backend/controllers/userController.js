import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { stripeInstance } from "../app.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(404).json({
      success: false,
      message: "user Already Exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    user = await User.create({ username, email, password: hashedPassword });
    const token = jwt.sign({ _id: user._id }, "svvfdhavyywebwghe");
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User Created Succesfully",
        user,
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    next(new Error("Email Does not Exist!"));
  } else {
    const matchPass = await bcrypt.compare(password, user.password);
    if (matchPass) {
      const token = jwt.sign({ _id: user._id }, "svvfdhavyywebwghe");
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 15 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Login Succesfully",
          user,
        });
    } else {
      next(new Error("Password or email does not match"));
    }
  }
};
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logout Succesfully",
  });
};

export const findById = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        data: "Id Is Not Valid",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

export const addPlans = async (req, res) => {
  try {
    const { newData, token } = req.body;
    console.log(newData)
    const amount = +newData.price * 100;
    try {
      const paymentRes = await stripeInstance.customers.create({
        source: token.id,
        amount,
        currency: "usd",
      });
    } catch (error) {
    }

    const user = await User.findById(newData.userId);
    const selectedPlan = {
      canWatch: newData.canWatch,
      plansInfo: newData.plansInfo,
      price: newData.price,
      quality: newData.quality,
      resol: newData.resol,
    };

    if (user && selectedPlan) {
      user.plans.push(selectedPlan);
      await user.save();

      res.status(200).json({ message: "Plan is activated Succesfully " });
    } else {
      res.status(404).json({ message: "User or plan data not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error subscribing to plan", error: error.message });
  }
};
