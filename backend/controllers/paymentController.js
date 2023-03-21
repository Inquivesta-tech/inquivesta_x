const Payments = require("../models/paymentModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const eventCosts = require("../data/eventCosts");
const verificationStatus = require("../utils/constants");

export const calculatePurchaseAmount = (eventsList) => {
    let purchasedAmount = 0;
    eventsList.forEach((event) => {
        purchasedAmount += eventCosts[event];
    });
    return purchasedAmount;
};

export const verifyPurchase = async (req, res) => { };

export const createPurchase = async (req, res) => {
    try {
        let eventsList = req.body.events;
        const req_body = req.body;
        let purchaseAmount = calculatePurchaseAmount(eventsList);
        const newPayment = await Payments.create({
            userName: req_body.userName,
            userId: req_body.userId,
            purchasedEvents: eventsList,
            purchaseAmount: purchaseAmount,
            utr: req_body.utr,
            verified: verificationStatus.VerificationInProcess,
        });
        // TODO add catch block
        res.status(200).json({ message: "Purchase Created" ,});
    } catch (err) {
        res.status(400).json({ message: "Purchase cannot be created" ,});
    }
};
