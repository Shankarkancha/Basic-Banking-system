const Customer= require("../models/customersmodal");

exports.displaytransactionscontroller=async(req,res)=>{
    try {
        const id= req.params.id;
        const customerinfo=await Customer.find({accNo:id});
        // console.log(customerinfo);
        // console.log(customerinfo[0].transactions);
        if(!customerinfo){
            res.status(404).send(error);
        }else{
            res.status(200).render("transactiondetails",{
                customerinfo
            });
        }
        
    } catch (error) {
        res.status.send(error);
    }
}