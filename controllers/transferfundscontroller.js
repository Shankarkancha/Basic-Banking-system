const Customer = require("../models/customersmodal");

exports.transferfundscontroller = async (req, res) => {
    try {
        let { Amount_entered } = req.body;
        Amount_entered = Math.abs(Number(Amount_entered.trim()));
        const sender = req.params.id;
        const receiver = req.body.Transferred_To;
        const debitFromURL = `/customers/${sender}/withdrawFunds`;
        const transferToURL = `/customers/${receiver}/addFunds`;
        const data = await Customer.find({ $or: [{ accNo: sender }, { accNo: receiver }] });
        let [S, R] = data;
        const sendername = S.accNo === sender ? S.name : R.name;
        const receivername = R.accNo === receiver ? R.name : S.name;
        // console.log(`Sent from ${sendername} to ${receivername}`);
        // console.log(data);


        // withdraw funds from the sender 

        const onecustomer = await Customer.findOne({ accNo: sender });
        // console.log(onecustomer);
        const currentbalance = onecustomer.currentBal + Number(-Amount_entered);
        if (currentbalance < 0) {
            throw Error("Insufficient funds");
        }
        const updatedcustomerdetails = await Customer.findOneAndUpdate({ accNo: sender }, {
            $inc: { currentBal: Number(-Amount_entered) },
            $push: {
                transactions: {
                    transactionType: "debit",
                    transactionDetails: {
                        transferredFrom: "Self",
                        transferredTo: receivername,
                        balance: currentbalance,
                        amount: Number(Amount_entered),
                    },
                },
            },
        })
        if (!updatedcustomerdetails) {
            res.status(404).send("error");
        } else {
            // Add funds to the receiver 

            const onecustomer = await Customer.findOne({ accNo: receiver });
            // console.log(onecustomer);
            const currentbalance = onecustomer.currentBal + Amount_entered;
            const updatedcustomerdetails = await Customer.findOneAndUpdate({ accNo: receiver }, {
                $inc: { currentBal: Amount_entered },
                $push: {
                    transactions: {
                        transactionType: "credit",
                        transactionDetails: {
                            transferredFrom: sendername,
                            transferredTo: "Self",
                            balance: currentbalance,
                            amount: Amount_entered,
                        },
                    },
                },
            })
            if (!updatedcustomerdetails) {
                res.status(404).send("error");
            } else {
                res.redirect(`/customerdetails/${sender}`);
                // console.log("updated sucessfully");
                // console.log(onecustomer.transactions);
            }
            // console.log("updated sucessfully");
        }
    } catch (error) {
        res.status(404).send(error);
    }
}