const mongoose = require('mongoose');
const validator = require('validator');
const verificationStatus = require("../utils/constants");

/* The Transaction ID is a map type which takes in  */
const paymentDetails = new mongoose.Schema(
    {
        userName : {
            type: String,
        },
        userId : {
            type : mongoose.Types.ObjectId,
            ref : 'Profile',
        },
        purchasedEvents : [String],
        purchasedAmount : Number,
        utr : {type : Number},
        verified : {type: "String"},
    }
)

const Payments = mongoose.model("Payments", paymentDetails);

modules.export = Payments;