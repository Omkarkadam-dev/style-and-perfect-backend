import nodemailer from "nodemailer";

export const appointmentMail = async (email: string, name: string, appointment: Date) => {
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
    <p>Dear ${name},</p>
    
    <p>Thank you for scheduling an appointment with <strong>StyleAndPerfect</strong>. We are pleased to confirm your appointment as follows:</p>

    <ul>
      <li><strong>Date:</strong> ${new Date(appointment).toLocaleDateString()}</li>
      <li><strong>Time:</strong> ${new Date(appointment).toLocaleTimeString()}</li>
    </ul>
    
    <p>We look forward to providing you with an exceptional experience. If you need to modify or cancel your appointment, please don't hesitate to contact us at <a href="mailto:your-email@gmail.com">your-email@gmail.com</a> or call us at (123) 456-7890.</p>
    
    <p>We kindly ask that you arrive a few minutes prior to your appointment to ensure that everything runs smoothly.</p>
    
    <p>Thank you for choosing <strong>StyleAndPerfect</strong>! We can't wait to see you.</p>
    
    <p>Warm regards,</p>
    <p><strong>Style & Perfect</strong><br>
    <a href="https://your-website.com">your-website.com</a><br>
    <a href="mailto:your-email@gmail.com">your-email@gmail.com</a><br>
    (123) 456-7890</p>
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
