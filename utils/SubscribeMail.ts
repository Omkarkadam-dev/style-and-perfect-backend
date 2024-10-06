import nodemailer from "nodemailer";

export const subscriptionMail = async (email: string) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "privatething789736@gmail.com",
      pass: "ylpa stve wvnu tsly",
    },
  });

  const mailOptions = {
    from: "<privatething789736@gmail.com>",
    to: email,
    subject: "Your Salon Appointment Confirmation",
    html: `
    <h3>Dear Subscriber,</h3>

    <p>Thank you for subscribing to <strong>StyleAndPerfect</strong>! We're thrilled to have you as part of our community. As a valued subscriber, you will be the first to receive exciting updates, special offers on salon care, and important news about our charity and donation initiatives.</p>

    <h4>What to Expect:</h4>
    <ul>
        <li><strong>Salon Care Tips & Offers:</strong> Get the latest on hair care trends, exclusive promotions, and salon services.</li>
        <li><strong>Charity & Donation Updates:</strong> Stay informed on how we’re making a difference through our charity work, and discover ways to get involved.</li>
        <li><strong>Exclusive Events:</strong> Be the first to know about upcoming events, donation drives, and community initiatives.</li>
    </ul>

    <p>We’re excited to share our journey with you, from salon care to supporting important causes.</p>

    <p>If you have any questions or suggestions, feel free to reply to this email or reach out to us at <a href="mailto:support@hair4life.com">support@hair4life.com</a>.</p>

    <p>Thank you for supporting <strong>StyleAndPerfect</strong>! We look forward to connecting with you.</p>

    <br>
    <p>Best regards,</p>
    <p><strong>The StyleAndPerfect Team</strong></p>
    <p><a href="https://your-website.com">www.hair4life.com</a></p>

    <br>
    <small>If you no longer wish to receive updates, you can <a href="https://your-website.com/unsubscribe">unsubscribe here</a>.</small>
`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error is sending the mail", err);
    } else {
      console.log("Email is sent successfully : ", info);
    }
  });

  return true;
};
