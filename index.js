const express = require("express");
const bodyParser = require("body-parser");
const { sendEmail } = require("./sender");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(bodyParser.json());

const loadEmailList = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "email-list.json"),
      "utf8"
    );
    return JSON.parse(data).emails;
  } catch (error) {
    console.error("Error reading email list:", error);
    throw new Error("Failed to load email list");
  }
};

const loadEmailTemplate = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "email-template.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading email template:", error);
    throw new Error("Failed to load email template");
  }
};

app.post("/send", async (req, res) => {
  try {
    // Load emails from JSON file
    const emailList = await loadEmailList();

    if (!emailList || !Array.isArray(emailList) || emailList.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid email addresses found in email-list.json",
      });
    }

    // Load template from JSON file
    const template = await loadEmailTemplate();

    const result = await sendEmail({
      to: emailList,
      subject: template.subject,
      templateData: template,
    });

    res.status(200).json({
      success: true,
      messageId: result.messageId,
      emailsSent: emailList.length,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
