import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, text) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: "haseebullahmemon33@gmail.com",
      pass: "onzuwdyqcyqausnm",
    },
  });

  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: "haseebullahmemon33@gmail.com",
        to: email,
        subject,
        text,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      }
    );
  });
};