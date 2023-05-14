const express= require("express");
const router= express.Router();
const {indexcontroller}=require("../controllers/indexcontroller");
const { viewcustomerscontroller } = require("../controllers/viewcustomerscontroller");
const { customerdisplaycontroller } = require("../controllers/customerdisplaycontroller");
const { addfundscontroller } = require("../controllers/addfundscontroller");
const { withdrawfundscontroller } = require("../controllers/withdrawfundscontroller");
const { transferfundscontroller } = require("../controllers/transferfundscontroller");
const {customeraddcontroller}=require("../controllers/customeraddcontroller");
const { displaytransactionscontroller } = require("../controllers/displaytransactionscontroller");

router.route("/").get(indexcontroller);

router.route("/customers").get(viewcustomerscontroller);

router.route("/customerdetails/:id").get(customerdisplaycontroller);

router.route("/customerdetails/:id/transactiondetails").get(displaytransactionscontroller);

router.route("/customers/:id/addfunds").post(addfundscontroller);
router.route("/customers").post(customeraddcontroller);
router.route("/customers/:id/withdrawfunds").post(withdrawfundscontroller);
router.route("/customers/:id/transferFunds").post(transferfundscontroller);

module.exports= router;