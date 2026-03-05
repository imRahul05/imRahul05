import twilio from "twilio";

export default async function handler(req, res) {

 if (req.method !== "POST") {
   return res.status(405).json({ error: "Method not allowed" });
 }

 const client = twilio(
   process.env.TWILIO_SID,
   process.env.TWILIO_AUTH_TOKEN
 );

 const { name, message } = req.body;

 try {

   await client.messages.create({
     body: `Portfolio message from ${name}: ${message}`,
     from: process.env.TWILIO_PHONE,
     to: process.env.MY_PHONE
   });

   res.status(200).json({
     success: true
   });

 } catch (err) {

   res.status(500).json({
     error: "Failed to send message"
   });

 }
}