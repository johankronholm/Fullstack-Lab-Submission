import { model } from "../models/usersModel.js";
export const controller = {};

controller.createUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.createUser(username, password);

  return result ? res.status(201).json({message: "User created!"}) : res.status(400).json({message: "Username already exists."}); 
};

controller.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.loginUser(username, password);

  return result ? res.status(201).json({message: "User created!"}) : res.status(400).json({message: "Username already exists."}); 
};

