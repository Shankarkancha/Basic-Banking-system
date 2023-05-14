const Customer= require("../models/customersmodal");

exports.customeraddcontroller= async (req,res)=>{
    // console.log(req.body);
    try {
        const customer= new Customer({
            name: `${req.body.results[0].name.title} ${req.body.results[0].name.first} ${req.body.results[0].name.last}`,
            email: req.body.results[0].email,
            address:req.body.results[0].location.country,
            dob:req.body.results[0].dob.date,
            currentBal: 10000,
            phone:req.body.results[0].phone,
            imgUrl:req.body.results[0].picture.large,
            gender:req.body.results[0].gender
        });
        // console.log(customer);
    const customerdata=await customer.save();
    res.send(customerdata);
    } catch (error) {
        console.log(error);
    }   
}