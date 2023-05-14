const Customer= require("../models/customersmodal");

exports.viewcustomerscontroller= async (req,res)=>{
    try {
        const customersdata= await Customer.find().sort("name");
        res.status(200).render("customers",{
            customersdata
        });
    } catch (error) {
        res.status(404).send(error);
    }
}