import mongoose from "mongoose";

const Schema = mongoose.Schema;

const runSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    distance: Number,
    seconds: Number,
    date: Date

});

export const model = mongoose.model("Run", runSchema);