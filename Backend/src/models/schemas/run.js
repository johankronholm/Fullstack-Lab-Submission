import mongoose from "mongoose";

const Schema = mongoose.Schema;

const runSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: String,
    distance: Number,
    seconds: Number,
    date: Date

});

export const model = mongoose.model("Run", runSchema);