import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import config from "@/config/config";
import { compileRegisterNotificationTemplate } from "@/utils/email";

export default async function Notify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { talent } = req.body;
    const smtp2goApiUrl = "https://api.smtp2go.com/v3/email/send";
    const htmlBody = compileRegisterNotificationTemplate(talent);
    const resEmail = await axios.post(
      smtp2goApiUrl,
      {
        sender: config.emailSenderAddress,
        to: [config.ripleysAdminAddress],
        subject: `${talent.first_name} ${talent.last_name} has registered!`,
        html_body: htmlBody,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": config.smtp2goApiKey,
          Accept: "application/json",
        },
      },
    );
    if (resEmail.status !== 200)
      return res.status(500).json({ error: "error send email" });
    return res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: `error send email: ${e}` });
  }
}
