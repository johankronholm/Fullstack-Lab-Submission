import { model as personalBestModel } from "./schemas/personalBest.js";
import { model as runModel } from "./schemas/run.js";

export const model = {};

model.updatePB = async (createdRun, runId, totalSeconds) => {
  try {
    const user = await personalBestModel.findOne({ userId: createdRun.userId });

    if (Number(createdRun.distance) === 0.5) {
      if (!user.pb500) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb500: runId } },
        );
      } else {
        const pbId = user.pb500;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb500: runId } },
          );
        }
      }
    }
    if (Number(createdRun.distance) === 1) {
      if (!user.pb1km) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb1km: runId } },
        );
      } else {
        const pbId = user.pb1km;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb1km: runId } },
          );
        }
      }
    }
    if (Number(createdRun.distance) === 5) {
      if (!user.pb5km) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb5km: runId } },
        );
      } else {
        const pbId = user.pb5km;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb5km: runId } },
          );
        }
      }
    }
    if (Number(createdRun.distance) === 10) {
      if (!user.pb10km) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb10km: runId } },
        );
      } else {
        const pbId = user.pb10km;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb10km: runId } },
          );
        }
      }
    }
    if (Number(createdRun.distance) === 21) {
      if (!user.pb21km) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb21km: runId } },
        );
      } else {
        const pbId = user.pb21km;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb21km: runId } },
          );
        }
      }
    }
    if (Number(createdRun.distance) === 42) {
      if (!user.pb42km) {
        await personalBestModel.findOneAndUpdate(
          { userId: createdRun.userId },
          { $set: { pb42km: runId } },
        );
      } else {
        const pbId = user.pb42km;
        const pb = await runModel.findById(pbId);
        if (totalSeconds < pb.seconds) {
          await personalBestModel.findOneAndUpdate(
            { userId: createdRun.userId },
            { $set: { pb42km: runId } },
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

model.getPB = async (userId) => {
  const pbs = {
    pb500: null,
    pb1km: null,
    pb5km: null,
    pb10km: null,
    pb21km: null,
    pb42km: null,
  };
  try {
    const data = await personalBestModel.findOne({ userId: userId });
    if (data) {
      pbs.pb500 = await runModel.findById(data.pb500);
      pbs.pb1km = await runModel.findById(data.pb1km);
      pbs.pb5km = await runModel.findById(data.pb5km);
      pbs.pb10km = await runModel.findById(data.pb10km);
      pbs.pb21km = await runModel.findById(data.pb21km);
      pbs.pb42km = await runModel.findById(data.pb42km);
      return pbs;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

model.removePB = async (runId) => {
  try {
    await personalBestModel.updateOne(
      { pb500: runId },
      { $set: { pb500: null } },
    );

    await personalBestModel.updateOne(
      { pb1km: runId },
      { $set: { pb1km: null } },
    );

    await personalBestModel.updateOne(
      { pb5km: runId },
      { $set: { pb5km: null } },
    );

    await personalBestModel.updateOne(
      { pb10km: runId },
      { $set: { pb10km: null } },
    );

    await personalBestModel.updateOne(
      { pb21km: runId },
      { $set: { pb21km: null } },
    );

    await personalBestModel.updateOne(
      { pb42km: runId },
      { $set: { pb42km: null } },
    );
  } catch (error) {
    console.error(error);
  }
};
