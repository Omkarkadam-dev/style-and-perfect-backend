import nodemailer from "nodemailer";

export const donationMail = async (email: string, name: string) => {
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
    subject: "Thank You for Registering for a Donation!",
    html: `
        <p>Dear ${name},</p>
        
        <p>On behalf of <strong>Our Organization </strong>, I want to sincerely thank you for registering as a donor on our platform. Your generosity and willingness to contribute will make a significant difference in the lives of those in need.</p>
        
        <p>We believe that together, we can create meaningful change, and your support plays a critical role in helping us achieve our mission. We are grateful for your commitment and excited to have you as a part of our community.</p>
        
        <p>If you have any questions or need further information, feel free to reach out to us at <a href="mailto:your-email@gmail.com">your-email@gmail.com</a>. We will keep you updated on the impact of your donation and any future opportunities to get involved.</p>
        
        <p>Thank you once again for your kindness and generosity.</p>
        
        <p>Warm regards,</p>
        <p><strong>Omkar Kadam & Spurti Kulkarni</strong><br>
        <strong></strong><br>
        <strong>StyleAndPerfect</strong><br>
        <a href="https://your-website.com">Our website</a><br>
        <a href="mailto:your-email@gmail.com">Contact Us</a></p>
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
