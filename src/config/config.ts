const config = {
  baseUrl: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  talentPerPage: Number(process.env.NEXT_PUBLIC_TALENT_PER_PAGE) || 9,
  uploadPrefix: process.env.NEXT_PUBLIC_UPLOADS_PREFIX || "/uploads",
};

export default config;
