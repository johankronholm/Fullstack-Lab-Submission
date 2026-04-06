import { model as runsModel } from "./run.js";
export const model = {};

model.getRuns = async () => {
  const runs = await runsModel.find({ user: "admin"}); 
  return runs;
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
  runsModel.create(newRun);
  return true;
};
