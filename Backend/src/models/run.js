import mongoose from "mongoose";

const schema = mongoose.Schema;

const runSchema = new schema({
    user: String,
    title: String,
    distance: Number,
    minutes: Number,
    seconds: Number,
    date: Date

});

export const model = mongoose.model("Run", runSchema);