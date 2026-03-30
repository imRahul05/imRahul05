// import twilio from 'twilio';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const client = twilio(import.meta.env.TWILIO_SID, import.meta.env.TWILIO_AUTH_TOKEN);

//   const { name, message } = req.body;

//   try {
//     await client.messages.create({
//       body: `Portfolio message from ${name}: ${message}`,
//       from: import.meta.env.TWILIO_PHONE,
//       to: import.meta.env.MY_PHONE,
//     });

//     res.status(200).json({
//       success: true,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: 'Failed to send message',
//     });
//   }
// }
