const Customer= require("../models/customersmodal");
exports.withdrawfundscontroller= async (req,res)=>{
    try {
        const id= req.params.id;
        let {Amount_entered}=req.body;
        Amount_entered= Amount_entered.trim();
        const onecustomer=await Customer.findOne({accNo:id});
        // console.log(onecustomer);
        const currentbalance= onecustomer.currentBal+Number(-Amount_entered);
        if(currentbalance<0){
            throw Error("Insufficient funds");
        }
        const updatedcustomerdetails=await Customer.findOneAndUpdate({accNo:id},{
            $inc:{currentBal:Number(-Amount_entered)},
            $push: {
                transactions: {
                  transactionType: "debit",
                  transactionDetails: {
                    transferredFrom: "Self",
                    transferredTo: "Self",
                    balance: currentbalance,
                    amount:Number(Amount_entered),
                  },
                },
              },
        })
        if(!updatedcustomerdetails){
            res.status(404).send("error");
        }else{
            res.redirect(`/customerdetails/${id}`);
            // console.log("updated sucessfully");
        }
        
    } catch (error) {
        res.status(404).send(error);
    }
}