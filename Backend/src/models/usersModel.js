import { model as usersModel } from "../models/User.js";
export const model = {};

model.createUser = async (username, password) => {
  if (!username || !password) {
    return false;
  }

  const found = await usersModel.findOne({ username: username });
  if (found) {
    return false;
  } else {
    const newUser = { username: username, password: password };
    usersModel.create(newUser);
    return newUser;
  }
};

model.loginUser = async (username, password) => {
  if (!username || !password) {
    return false;
  }
  const user = await usersModel.findOne({ username: username });
  if (!user) {
    return false;
  }
  else {
    return user.password === password ? user : false;
  }
};
