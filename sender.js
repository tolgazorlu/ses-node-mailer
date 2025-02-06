const AWS = require("aws-sdk");
const { htmlTemplate } = require("./htmlTemplate");
require("dotenv").config();

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_SES_REGION,
};

const ses = new AWS.SES(SES_CONFIG);

const sendEmail = async ({ to, subject, templateData }) => {
  if (!to || !Array.isArray(to) || to.length === 0) {
    throw new Error(
      "Recipients list is required and must be a non-empty array"
    );
  }

  if (!subject) {
    throw new Error("Email subject is required");
  }

  const params = {
    Source: process.env.AWS_SES_SENDER,
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate(templateData || {}),
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };

  try {
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", data);
    return {
      success: true,
      messageId: data.MessageId,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
};
