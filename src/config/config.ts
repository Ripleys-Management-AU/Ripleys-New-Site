const config = {
  baseUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  talentPerPage: Number(process.env.NEXT_PUBLIC_TALENT_PER_PAGE) || 9,
  uploadPrefix: process.env.NEXT_PUBLIC_UPLOADS_PREFIX || "/uploads",
  smtp2goApiKey: process.env.SMTP2GO_API_KEY || "",
  emailSenderAddress:
    process.env.EMAIL_SENDER_ADDRESS || "noreply@ripleys.site",
  ripleysAdminAddress:
    process.env.RIPLEYS_ADMIN_ADDRESS || "rm@ripleysmanagement.com.au",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhookSecret:
    process.env.STRIPE_WEBHOOK_SECRET ||
    "whsec_ed89263a4db51c74bff0b26fbdc6f86a5d4a6c6f98f178c7746d955850a38463",
  awsRegion: process.env.RIPLYES_AWS_REGION || "",
  awsAccessKeyId: process.env.RIPLYES_AWS_ACCESS_KEY_ID || "",
  awsSecretAccessKey: process.env.RIPLYES_AWS_SECRET_ACCESS_KEY || "",
};

export default config;
