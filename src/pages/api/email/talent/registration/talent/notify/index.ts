import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import config from "@/config/config";
import { ACTOR } from "@/constants";
import { compileRegisterTalentNotificationTemplate } from "@/utils/email";

export default async function Notify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { talent } = req.body;
    const artistType = talent.artist_type;
    const isActor = Number(artistType) === ACTOR;
    const smtp2goApiUrl = "https://api.smtp2go.com/v3/email/send";
    const htmlBody = compileRegisterTalentNotificationTemplate(isActor);
    const resEmail = await axios.post(
      smtp2goApiUrl,
      {
        sender: config.emailSenderAddress,
        to: [talent.email],
        subject: `Welcome to Ripleys Management Australia! ${isActor && `- We Will Contact You To Discuss Your Opportunities`}`,
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
