const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-bottom: 2px solid #e9ecef;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${data.title || "Welcome!"}</h1>
        </div>
        <div class="content">
            <p>Hello ${data.name || "there"},</p>
            <p>${
              data.message || "Thank you for subscribing to our newsletter."
            }</p>
            ${
              data.callToAction
                ? `
            <div style="text-align: center;">
                <a href="${data.callToAction.link}" class="button">${data.callToAction.text}</a>
            </div>
            `
                : ""
            }
            <p>Best regards,<br>${data.senderName || "The Team"}</p>
        </div>
        <div class="footer">
            <p>${
              data.footerText || "© 2024 Your Company. All rights reserved."
            }</p>
            ${
              data.unsubscribeLink
                ? `
            <p><a href="${data.unsubscribeLink}">Unsubscribe</a></p>
            `
                : ""
            }
        </div>
    </div>
</body>
</html>
`;

module.exports = {
  htmlTemplate,
};
