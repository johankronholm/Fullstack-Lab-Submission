import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personalBestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pb500: {
    type: Schema.Types.ObjectId,
    ref: "Run",
  },

  pb1km: {
    type: Schema.Types.ObjectId,
    ref: "Run",
  },

  pb5km: {
    type: Schema.Types.ObjectId,
    ref: "Run",
  },

  pb10km: {
    type: Schema.Types.ObjectId,
    ref: "Run",
  },
  pb21km: {
    type: Schema.Types.ObjectId,
    ref: "Run",
  },
  pb42km: {
      type: Schema.Types.ObjectId,
      ref: "Run",
  },
});

export const model = mongoose.model("PB", personalBestSchema);
