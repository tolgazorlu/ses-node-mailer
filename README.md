# AWS SES Email Sender

A Node.js application that sends bulk emails using AWS Simple Email Service (SES). The application reads recipient email addresses from a JSON file and uses a customizable email template.

## Prerequisites

- Node.js (v14 or higher)
- AWS Account with SES access
- AWS SES verified email address or domain
- npm (Node Package Manager)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ses-node-mailer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your AWS credentials:

```env
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_SES_REGION=your_aws_region
AWS_SES_SENDER=your_verified_sender_email
PORT=3000
```

## Configuration

### Email List

Edit `email-list.json` to manage your recipient list:

```json
{
  "emails": [
    "recipient1@example.com",
    "recipient2@example.com",
    "recipient3@example.com"
  ]
}
```

### Email Template

Customize your email template by editing `email-template.json`:

```json
{
  "title": "Your Email Title",
  "subject": "Your Email Subject",
  "message": "Your main message content",
  "callToAction": {
    "text": "Button Text",
    "link": "https://your-link.com"
  },
  "senderName": "Your Name",
  "footerText": "Your footer text",
  "unsubscribeLink": "https://your-unsubscribe-link.com"
}
```

## Usage

1. Start the server:

```bash
node index.js
```

2. Send emails to all recipients in your list:

```bash
curl -X POST http://localhost:3000/send
```

3. Check server health:

```bash
curl http://localhost:3000/health
```

## API Endpoints

- `POST /send`: Sends emails to all recipients in email-list.json
- `GET /health`: Health check endpoint

## Response Format

### Success Response

```json
{
  "success": true,
  "messageId": "AWS-MESSAGE-ID",
  "emailsSent": 3
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

## File Structure

```
ses-node-mailer/
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── index.js             # Main application file
├── sender.js            # Email sending logic
├── htmlTemplate.js      # Email HTML template
├── email-list.json      # Recipient list
├── email-template.json  # Email content template
└── README.md            # This file
```

## AWS SES Setup

1. Sign up for AWS and navigate to the SES console
2. Verify your sender email address or domain
3. If your account is in sandbox mode:
   - Verify recipient email addresses
   - Request production access if needed
4. Create IAM credentials with SES permissions
5. Add credentials to your `.env` file

## Development

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Troubleshooting

1. **Emails not sending:**

   - Check AWS credentials in `.env`
   - Verify sender email in AWS SES
   - Ensure recipients are verified (if in sandbox mode)

2. **Server won't start:**
   - Check if port 3000 is available
   - Verify all dependencies are installed
   - Ensure `.env` file exists with correct values

## Security Notes

- Never commit `.env` file
- Keep AWS credentials secure
- Regularly rotate AWS access keys
- Use appropriate AWS IAM permissions

## License

ISC

## Support

For issues and feature requests, please create an issue in the repository.
