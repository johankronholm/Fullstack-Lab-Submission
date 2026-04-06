import { model } from "../models/usersModel.js";
export const controller = {};

controller.createUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.createUser(username, password);

  return result ? res.status(201).json({user: result}) : res.status(400).json({message: "Error: Username already exists."}); 
};

controller.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.loginUser(username, password);

  return result ? res.status(201).json({user: result}) : res.status(400).json({message: "Error: Invalid username/password."}); 
};

