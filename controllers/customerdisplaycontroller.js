const moment= require("moment");
const Customer= require("../models/customersmodal");

exports.customerdisplaycontroller= async (req,res)=>{
    try {
        const id= req.params.id;
        const individualdata=await Customer.findOne({accNo:id});
        const createdAt= moment(individualdata.createdAt).format("lll");
        const modifiedAt = moment(individualdata.updatedAt).format("lll");
        const dob = moment(individualdata.dob).format("ll");
        const allcustomers=await Customer.find({accNo:{$ne:id}});
        res.status(200).render("customerdetails",{
            allcustomers,
            individualdata,
            createdAt,
            modifiedAt,
            dob
        });
    } catch (error) {
        res.status(404).send(error);
    }
}