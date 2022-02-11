const express = require("express"); 
const accountsRouter = express.Router();
const AccountsInfo = require("../model/UserAccounts");
const { encryptData, decryptData } = require("../helpers/crypto");
const jwt = require("jsonwebtoken");

accountsRouter.post("/signup", async (req, res) => {
    
    try {
        
        var item = {
            uname: req.body.uname,
            email: req.body.email,
            password: req.body.password,
            admin: false
        }
        if (item.uname !== "" && item.email !== "" && item.password !== "") {
            user = await AccountsInfo.findOne({ $or: [{ uname: item.uname }, { email: item.email }] });
            if (user) throw new Error("User already exists.");
            const userAccount = new AccountsInfo(item);
            userAccount.save()
                .then(() => res.json({ status: "Success" }))
                .catch((er) => {
                    console.log(er)
                    res.sendStatus(500).json({ status: "Error" });
                });
        } else {
            res.json({ status: "Error", message: "Invalid inputs" });
        }} catch (error) {
        res.json({ status: "Error", message: error.message });
    }
   
})

accountsRouter.post("/login", async (req, res) => {
    const uname = req.body.uname;
    const password = req.body.password;
    try {
        let user = await AccountsInfo.findOne({ uname: uname })
        if (!user) throw new Error("Invalid username or password.");
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) throw new Error("Invalid username or password.");
        const payload = { user: user.uname, admin: user.admin };
        const token = jwt.sign(payload, process.env.JWT_Key, { expiresIn: '1d' });
        res.json({
            uname: user.uname,
            admin: user.admin,
            token: token
        });
         
    } catch (error) {
        res.json({ status: "Error", message: error.message })
    }
    

        
})

module.exports = accountsRouter;
