import { model as runsModel } from "./schemas/run.js";
import { model as personalBestsModel } from "./personalBestModel.js";
export const model = {};

model.getRuns = async (userId) => {
  try {
    const runs = await runsModel.find({ userId: userId });
    return runs;
  } catch (error) {
    return false;
  }
};

model.createRun = async (userId, title, distance, minutes, seconds, date) => {
  if (
    userId == null ||
    userId === "" ||
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

  if (minutesNumber === 0 && secondsNumber === 0) {
    return false;
  }

  if (date == null || date === "") {
    return false;
  }

  const parsedDate = new Date(date);

  const minutesToSeconds = minutesNumber * 60;
  const totalSeconds = Number(seconds) + minutesToSeconds;

  const newRun = {
    userId: userId,
    title: title,
    distance: distance,
    seconds: totalSeconds,
    date: parsedDate,
  };

  try {
    const createdRun = await runsModel.create(newRun);
    await personalBestsModel.updatePB(newRun, createdRun._id, totalSeconds);
    return true;
  } catch (error) {
    console.error(error);
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

  const minutesToSeconds = minutesNumber * 60;
  const totalSeconds = Number(seconds) + minutesToSeconds;

  if (date == null || date === "") {
    return false;
  }

  const parsedDate = new Date(date);

  try {
    const found = await runsModel.findById(id);
    if (!found) {
      return false;
    }
  } catch (error) {
    return false;
  }

  try {
    const newRun = await runsModel.findByIdAndUpdate(id, {
      title: title,
      distance: distance,
      seconds: totalSeconds,
      date: parsedDate,
    });
    await personalBestsModel.updatePB(newRun, id, totalSeconds);
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
    await personalBestsModel.removePB(id);
    return true;
  } catch (error) {
    return false;
  }
};
