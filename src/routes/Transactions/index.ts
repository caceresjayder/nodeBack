import passport from "passport";
import { OnlyAdmin } from "../../services/Authorization";
import { TransactionController } from "../../controllers/Transaction.controller";
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get("/transactions",
async(req: any, res: any) => {
    res.status(200).send("It's Transactions endpoint")
})

router.get('/transactions/all', 
passport.authenticate('jwt', {session: false}),
OnlyAdmin,
async(req: any, res: any) => {
    try{
        const transactions = await TransactionController.findAll()
        res.status(200).send(transactions)
    }
    catch(err){
     res.status(404).send(err.toString())
    }
})

router.get('/transactions/email', 
passport.authenticate('jwt', {session: false}),
OnlyAdmin,
async(req: any, res:any) => {
   try{
        const transactionsByUserEmail = TransactionController.findAllOfUser(req.body.email);
        res.status(200).send(transactionsByUserEmail)
   }
   catch(err){
    res.status(404).send(err.toString())
   }
})


router.post("/transactions", 
passport.authenticate('jwt', {session: false}),
OnlyAdmin,
async(req: any, res: any) => {
    
    try{
        const response = await TransactionController.create(req.body);
        res.status(200).send(response);
    }
    catch(err){
        res.status(500).send(err.toString())
    }
})

export default router;