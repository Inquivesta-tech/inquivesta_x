const mongoose = require('mongoose');
const validator = require('validator');

const verificationStatus = {
    Verified : "Verified",
    TransactionFailed : "Failed",
    VerificationInProcess : "InProcess"
}

/* The Transaction ID is a map type which takes in  */
const paymentDetails = new mongoose.Schema(
    {
        userName : {
            type: String,
        },
        purchasedItems : [],
        utr : {type : int},
        verified : {type: verificationStatus},
    }
)

const paymentSchema = new mongoose.Schema(
    {
        name : {
            type: String,
        },
        transactionID: {
            type : String,
        },
    }
)

const Payments = mongoose.model("Payments", paymentSchema);

modules.export = Payments;