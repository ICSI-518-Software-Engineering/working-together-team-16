const express = require("express")

var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const UserRoutes = express.Router()
const path = require('path');
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const verify_token = require("../middlewares/verify_token");

const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "CodeJudge", {
        expiresIn: maxAge,
    });
};


const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {
        user: 'pypilot5@gmail.com',
        pass: 'kibablxoldziwylw',
    },

});

const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./Views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./Views'),
    extName: ".handlebars",

}


transporter.use('compile', hbs(handlebarOptions));

UserRoutes.post("/createuser", async (req, res) => {
    try {
        const userinfo = new User(req.body)
        await userinfo.save()
        res.send(userinfo._id)
    } catch (err) {

        res.send(err)
    }

})

UserRoutes.post("/sendotp", async (req, res) => {
    var otp = Math.floor(Math.random() * 9000 + 1000);
    const mailData = {
        from: "pypilot5@gmail.com",
        to: req.body.mail,
        subject: otp + '- Verify Otp',
        template: 'email',
        context: {
            name: "",
            code: otp,
            mail: req.body.mail
        }
    };
    transporter.sendMail(mailData, async function (err, info) {
        if (err) {
            console.log(err)
            res.json({
                message: "server error try again",
            })
        }
        else {
            const mail = await User.findOne({ mail: req.body.mail })
            mail.otp = otp
            await mail.save()
            res.json({
                message: "OTP sent to " + req.body.mail,
            })
        }
    });
})

UserRoutes.get("/checkmail/:mail", async (req, res) => {
    try {
        const mail = await User.findOne({ mail: req.params.mail })
        console.log(mail)
        if (mail && mail.isverified) {
            res.send({
                value: true,
                userid: mail._id,
                id: mail._id
            })
        }
        else if (mail && !mail.isverified) {
            await User.deleteOne({ _id: mail._id }).then(() => {
                res.send({
                    value: false,
                })
            })
        }

        else {
            res.send({
                value: false,
            })
        }
    } catch {
        res.send("Network Error")
    }
})

// UserRoutes.post("/SendCookie", (req, res) => {

// })

UserRoutes.post("/VerifyUser/:Token", (req, res, next) => {
    const token = req.params.Token;
    if (token) {
        jwt.verify(
            token,
           "CodeJudge",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const user = await User.findById(decodedToken.id);
                    if (user) res.json({ status: true, user: user });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
        next();
    }
})

UserRoutes.get("/account/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const response = {
            m: user.m,
            fn: user.fn,
            ln: user.ln,
            l: user.l,
            Resumes: user.Resumes
        }

        res.send(response)
    } catch (err) {
        res.send(err)
    }
})
UserRoutes.post("/updatepassword", async (req, res) => {
    try {
        const user = await User.findOne({ mail: req.body.mail })
        user.password = req.body.password
        await user.save()
        res.send("Successfully updated Password")
    }
    catch (err) {
        res.send(err)
    }
})

UserRoutes.get("/checkotp/:mail/:otp", async (req, res) => {
    try {
        const user = await User.findOne({ mail: req.params.mail })
        if (Number(req.params.otp) === user.otp) {
            const token = createToken(user._id);
            console.log("login success")
            user.isverified = true
            user.otp = ""
            console.log(user)
            user.save()
            res.send({
                verified: true,
                Token: token
            })

        } else {
            console.log("wrong otp")
            res.send({
                verified: false
            })

        }

    }
    catch (err) {
        res.send(err)
    }
})

UserRoutes.get("/signin/:mail/:password", async (req, res) => {
    try {
        const user = await User.findOne({ mail: req.params.mail })
        if (req.params.password === user.password) {
            const token = createToken(user._id);
            

            res.send({
                verified: true,
                Token: token
            })

        } else {
            res.send({
                verified: false
            })
        }
    }
    catch (err) {
        res.send(err)
    }
})

UserRoutes.get("/" ,verify_token, async(req,res)=> {
    res.send(req.user)
})

UserRoutes.post("/level" , verify_token, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        console.log(req.body);
        user["exp_level"] = req.body.level;

        await user.save();

        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});


module.exports = UserRoutes

