import { model } from "../models/usersModel.js";
export const controller = {};

controller.createUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.createUser(username, password);

  return result
    ? res.status(201).json({ user: result })
    : res.status(400).json({ message: "Error: Username already exists." });
};

controller.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await model.loginUser(username, password);

  return result
    ? res.status(201).json({ user: result })
    : res.status(401).json({ message: "Error: Invalid username/password." });
};

controller.getPB = async (req, res) => {
  const id = req.query.id;
  const result = await model.getPB(id);
  return result
    ? res.status(200).json({ user: result })
    : res.status(404).json({ message: "No PBs was found." });
};
