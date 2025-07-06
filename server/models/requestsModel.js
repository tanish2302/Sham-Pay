const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
    {
        amount: { type: Number, required: true },

        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        description: { type: String, required: true },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "accepted", "rejected"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);