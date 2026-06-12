import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

export const register = async (
  req: Request,
  res: Response
) => {
  const data = registerSchema.parse(req.body);

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (
  req: Request,
  res: Response
) => {
  const data = loginSchema.parse(req.body);

  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user._id.toString());

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getMe = async (
  req: Request,
  res: Response
) => {
  res.status(200).json(req.user);
};