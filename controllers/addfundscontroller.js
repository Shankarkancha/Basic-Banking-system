const Customer= require("../models/customersmodal");
exports.addfundscontroller= async (req,res)=>{
    try {
        const id= req.params.id;
        let {Amount_entered}=req.body;
        Amount_entered= Math.abs(Number(Amount_entered.trim()));
        const onecustomer=await Customer.findOne({accNo:id});
        // console.log(onecustomer);
        const currentbalance= onecustomer.currentBal+Amount_entered;
        const updatedcustomerdetails=await Customer.findOneAndUpdate({accNo:id},{
            $inc:{currentBal:Amount_entered},
            $push: {
                transactions: {
                  transactionType: "credit",
                  transactionDetails: {
                    transferredFrom: "Self",
                    transferredTo: "Self",
                    balance: currentbalance,
                    amount:Amount_entered,
                  },
                },
              },
        })
        if(!updatedcustomerdetails){
            res.status(404).send("error");
        }else{
            res.redirect(`/customerdetails/${id}`);
            // console.log("updated sucessfully");
            // console.log(onecustomer.transactions);
        }
        
    } catch (error) {
        res.status(404).send(error);
    }
}