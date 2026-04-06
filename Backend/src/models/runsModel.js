import { model as runsModel } from "./run.js";
export const model = {};

model.getRuns = async () => {
  try {
    const runs = await runsModel.find({ user: "admin" });
    return runs;
  } catch (error) {
    return false;
  }
};

model.createRun = async (title, distance, minutes, seconds, date) => {
  if (title == null || title === "" || distance == null || distance === "") {
    return false;
  }

  const minutesNumber = Number(minutes);
  const secondsNumber = Number(seconds);

  if (Number.isNaN(minutesNumber) && Number.isNaN(secondsNumber)) {
    return false;
  }

  const parsedDate = new Date(date);

  if (date == null || date === "") {
    return false;
  }

  const newRun = {
    user: "admin",
    title: title,
    distance: distance,
    minutes: minutes,
    seconds: seconds,
    date: parsedDate,
  };

  try {
    runsModel.create(newRun);
    return true;
  } catch (error) {
    return false;
  }
};

model.editRun = async (id, title, distance, minutes, seconds, date) => {
  if (
    id == null ||
    id === "" ||
    title == null ||
    title === "" ||
    distance == null ||
    distance === ""
  ) {
    return false;
  }

  const minutesNumber = Number(minutes);
  const secondsNumber = Number(seconds);

  if (Number.isNaN(minutesNumber) && Number.isNaN(secondsNumber)) {
    return false;
  }

  const parsedDate = new Date(date);

  if (date == null || date === "") {
    return false;
  }

  try {
    const found = await runsModel.findById(id);
    if (!found) {
      return false;
    }
  } catch (error) {
    return false;
  }

  try {
    await runsModel.findByIdAndUpdate(id, {
      title: title,
      distance: distance,
      minutes: minutes,
      seconds: seconds,
      date: parsedDate,
    });
    return true;
  } catch (error) {
    return false;
  }
};

model.deleteRun = async (id) => {
  const found = await runsModel.findById(id);
  if (!found) {
    return false;
  }
  try {
    await runsModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    return false;
  }
};
