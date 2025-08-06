const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

//transfer money from one account to another
router.post("/transfer-funds", authMiddleware, async (req, res) => {
    try {
        const {  receiver, amount } = req.body;
        const sender = req.userId;

        // save transactions
        const newTransaction = new Transaction({
            sender,
            receiver,
            amount,
            type: "transfer",
            reference: "manual transfer",
            status: "success",
        });
        await newTransaction.save();

        //decrease sender's balance
        await User.findByIdAndUpdate(sender, { $inc: { balance: -amount } });

        //increase sender's balance
        await User.findByIdAndUpdate(receiver, { $inc: { balance: amount } });

        res.send({
            message: "Transaction successful",
            data: newTransaction,
            success: true,
        });
    } catch (error) {
        res.send({
            message: "Transaction failed",
            data: error.message,
            success: false,
        });
    }
});

//verify receiver'account number
router.post("/verify-account", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.receiver});
        if (!user) throw new Error("Account not found");

        res.send({ message: "Account verified", data: user, success: true });
    } catch (error) {
        res.send({ message: error.message, data: error.message, success: false });
    }
});

//get all transactions for a user
router.post(
    "/get-all-transactions-by-user",
    authMiddleware,
    async (req, res) => {
        try {
            const transactions = await Transaction.find({
                $or: [{ sender: req.userId }, { receiver: req.userId }],
            })
                .sort({ createdAt: -1 })
                .populate("sender", "firstName lastName email")
                .populate("receiver", "firstName lastName email");

            res.send({
                message: "Transactions fetched",
                data: transactions,
                success: true,
            });
        } catch (error) {
            res.send({
                message: "Transactions not fetched",
                data: error.message,
                success: false,
            });
        }
    }
);

//deposit funds

router.post("/deposit-funds", authMiddleware, async (req, res) => {
    try {
        const { token, amount } = req.body;

        // Create a customer
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        // Create a charge
        const charge = await stripe.charges.create(
            {
                amount: amount * 100,
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Deposit of $${amount} to ShamPay`,
            },
            {
                idempotencyKey: uuidv4(),
            }
        );

        // If the charge is successful, create a new transaction
        if (charge.status === "succeeded") {
            const newTransaction = new Transaction({
                sender: req.userId,
                receiver: req.userId,
                amount,
                type: "deposit",
                reference: "stripe deposit",
                status: "success",
            });
            await newTransaction.save();

            // Increase the user's balance
            await User.findByIdAndUpdate(req.userId, {
                $inc: { balance: amount },
            });

            res.send({
                message: "Transaction successful",
                data: newTransaction,
                success: true,
            });
        } else {
            res.send({
                message: "Transaction failed",
                data: charge,
                success: false,
            });
        }
    } catch (error) {
        res.send({
            message: "Transaction failed",
            data: error.message,
            success: false,
        });
    }
});

module.exports = router;