const mongoose = require('mongoose');
const validator = require("validator");
const grievanceSchema = new mongoose.Schema(
    {
        profileId: {
            type: String,
            required: [true, "Provide a Profile Id"],
        },
        grievanceDesc: {
            type: String,
            required: [true, "Describe your grievances!"],
        },
        contactNo: {
            type: Number,
            validate: (val) => {
                return val > 999999999;
            },
        },

    }
);

const Payments = mongoose.model("Payments", paymentSchema);

module.exports = Payments;
