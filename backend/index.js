const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
// require("dotenv").config();
var ip = require("ip");

const app = express()

app.use(express.json())
app.use(cors())

const nodemailer = require("nodemailer");

mongoose.connect("mongodb+srv://Hema:12345@cluster0.coatkch.mongodb.net/passkeyretryWrites=true&w=majority&appName=Cluster0").then(function () {
        console.log("DB connected")
        console.dir ( ip.address() );

    }).catch(function (err) {
        console.dir ( ip.address() );

        console.log("Failed to DB")

        console.log(err)
    })

const credentials = mongoose.model("credential", {}, "bulkmail")









app.post("/sendemail", function (req, res) {

    let msg = req.body.msg
let email = req.body.emailList

    credentials.find().then(function (data) {
        console.log(data)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass
            },
        });

        new Promise(async function (resolve, reject) {
            try {
                for (var i = 0; i < email.length; i++) {
                    await transporter.sendMail({
                        from: "archuhema12@gmail.com",
                        to: email[i],
                        subject: "A Message from BulkMail App",
                        text: msg
                    });

                    console.log("Email sent to:" + email[i])
                }
                resolve("Success")
            } catch (error) {
                reject("Failed")
            }
        }).then(function () {
            res.send(true)
        }).catch(function () {
            res.send(false)
        })
    }).catch(function (error) {
        console.log(error)
    })


});




app.listen(5000, function () {
    console.log("Server Started...")
})
 



