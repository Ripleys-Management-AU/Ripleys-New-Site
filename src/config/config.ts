const config = {
  baseUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  talentPerPage: Number(process.env.NEXT_PUBLIC_TALENT_PER_PAGE) || 9,
  uploadPrefix: process.env.NEXT_PUBLIC_UPLOADS_PREFIX || "/uploads",
  smtp2goApiKey: process.env.SMTP2GO_API_KEY || "",
  emailSenderAddress: process.env.EMAIL_SENDER_ADDRESS || "admin@akiraspace.io",
  ripleysAdminAddress:
    process.env.RIPLEYS_ADMIN_ADDRESS || "rm@ripleysmanagement.com.au",
};

export default config;
