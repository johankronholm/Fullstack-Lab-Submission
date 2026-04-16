import { model as usersModel } from "../models/schemas/user.js";
import { model as personalBestModel } from "../models/schemas/personalBest.js";
import bcrypt from "bcrypt"
export const model = {};

model.createUser = async (username, password) => {
  if (!username || !password) {
    return false;
  }
  try {
    const normalizedUsername = String(username).toLocaleLowerCase();
    const found = await usersModel.findOne({
      username: normalizedUsername,
    });
    if (found) {
      return false;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username: normalizedUsername,
        password: hashedPassword,
      };
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
    const normalizedUsername = String(username).toLocaleLowerCase();
    const user = await usersModel.findOne({ username: normalizedUsername });
    if (!user) {
      return false;
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? user : false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
