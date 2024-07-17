import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import config from "@/config/config";
import { compileRequestEmailClientTemplate } from "@/utils/email";
import { mapSelectedTalentsToTalentAndEmail } from "@/utils/talent";

export default async function Notify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { formData } = req.body;

    const smtp2goApiUrl = "https://api.smtp2go.com/v3/email/send";

    const { selected_talents, name, email } = formData;
    const mappedTalents = mapSelectedTalentsToTalentAndEmail(selected_talents);

    const adminEmailText =
      `${name} requested talents, the email is ${email}, talents requested are:\n\n` +
      mappedTalents
        .map(
          (talent) =>
            `talent name: ${talent.talentName}, talent email: ${talent.talentEmail} \n`,
        )
        .join("\n");

    const resAdminEmail = await axios.post(
      smtp2goApiUrl,
      {
        sender: config.emailSenderAddress,
        to: [config.ripleysAdminAddress],
        subject: `${name} has requested talents`,
        text_body: adminEmailText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": config.smtp2goApiKey,
          Accept: "application/json",
        },
      },
    );

    const clientEmailHtmlBody = compileRequestEmailClientTemplate();

    const resClientEmail = await axios.post(
      smtp2goApiUrl,
      {
        sender: config.emailSenderAddress,
        to: [email],
        subject: `Thanks for submitting your request`,
        html_body: clientEmailHtmlBody,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Smtp2go-Api-Key": config.smtp2goApiKey,
          Accept: "application/json",
        },
      },
    );
    if (resAdminEmail.status !== 200 || resClientEmail.status !== 200)
      return res.status(500).json({ error: "error send email" });
    return res.status(200).json({ message: "OK" });
  } catch (e) {
    return res.status(500).json({ error: `error send email: ${e}` });
  }
}
