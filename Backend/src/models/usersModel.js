import { model as usersModel } from "../models/schemas/user.js";
import { model as personalBestModel } from "../models/schemas/personalBest.js";
export const model = {};

model.createUser = async (username, password) => {
  if (!username || !password) {
    return false;
  }
  try {
    const found = await usersModel.findOne({
      username: String(username).toLocaleLowerCase,
    });
    if (found) {
      return false;
    } else {
      const newUser = { username: username, password: password };
      const createdUser = await usersModel.create(newUser);
      await personalBestModel.create({
        userId: createdUser._id,
        pb500: null,
        pb1km: null,
        pb5km: null,
        pb10km: null,
        pb21km: null,
        pb42km: null,
      });
      return createdUser;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

model.loginUser = async (username, password) => {
  if (!username || !password) {
    return false;
  }
  try {
    const user = await usersModel.findOne({ username: username });
    if (!user) {
      return false;
    } else {
      return user.password === password ? user : false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
