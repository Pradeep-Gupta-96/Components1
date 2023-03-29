import express from 'express'
import fs from 'fs'
import pdf from 'html-pdf'
import { createTransport } from "nodemailer";

const app = express()
const port = 4000

app.get("/home", (req, res) => {
    res.json({ message: "your server is running here" })

    var html = fs.readFileSync('./card.html', 'utf8');
    var options = { format: 'Letter' };

    let mapObj = {
        "{{Amount}}": "130",
        "{Prise}": "200"
    }
    html = html.replace(/{{Amount}}|{Prise}/gi, (matched) => { return mapObj[matched] })

    pdf.create(html, options).toFile('./invoice.pdf', async (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(res); //{ filename: 'C:\\ARENESS\\createpdf\\invoice.pdf' }

            const transport = createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'alessia55@ethereal.email',
                    pass: 'XyghWCEpgFcRKUVHcn'
                }
            });

            await transport.sendMail({
                from: 'alessia55@ethereal.email',
                to: 'areness@gmail.com',
                subject: 'Invoice2',
                text: 'node js testing mail for areness',
                attachments: [
                    {
                        path: res.filename
                    }
                ]
            });
        }
    });
})

app.listen(port, () => { console.log(`your serer running at port ${port}`) })

/**
 * const client = require('twilio')
const accountSid =TWILIO_ACCOUNT_SID;
const authToken =TWILIO_AUTH_TOKEN;
const client=new twilio(accountSid, authToken);

const sendSMS=()=>{
return client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => {
    console.log(message,'message sent')
  })
  .then(err => {
    console.log(err,'message not sent')
  });
}
sendSMS()
 */


//pdfkit