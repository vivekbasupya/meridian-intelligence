import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, requirements } = req.body;

    if (!name || !email || !requirements) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = await resend.emails.send({
      from: 'Meridian Intelligence <onboarding@resend.dev>',
      to: ['basupyavivek@gmail.com'], // Send leads to your email
      subject: `New Lead: ${name} from Meridian Intelligence`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Requirements/Message:</h3>
        <p style="white-space: pre-wrap;">${requirements}</p>
      `,
    });

    return res.status(200).json({ message: 'Success', id: data.id });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
