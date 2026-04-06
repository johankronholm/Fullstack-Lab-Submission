import { model } from "../models/run.js";
import { model as runsModel } from "../models/runsModel.js";
export const controller = {};

controller.getRuns = async (req, res) => {
  const result = await runsModel.getRuns();
  return result
    ? res.status(200).json({ data: result })
    : res.status(404).json({ message: "No runs registered." });
};

controller.createRun = async (req, res) => {
  const { title, distance, minutes, seconds, date } = req.body;

  const result = await runsModel.createRun(
    title,
    distance,
    minutes,
    seconds,
    date,
  );
  return result
    ? res.status(201).json({ data: result })
    : res.status(400).json({ message: "Run was not created." });
};

controller.editRun = async (req, res) => {
  const { id, title, distance, minutes, seconds, date } = req.body;
  const result = await runsModel.editRun(
    id,
    title,
    distance,
    minutes,
    seconds,
    date,
  );
  return result
    ? res.status(201).json({ message: "Run was succesfully edited." })
    : res.status(400).json({ message: "Run was not edited." });
};

controller.deleteRun = async (req, res) => {
  const id = req.query.id;
  const result = await runsModel.deleteRun(id);
  return result
    ? res.status(200).json({ message: "Run was deleted." })
    : res.status(400).json({ message: "Run was not deleted." });
};
