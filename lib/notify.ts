import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type Channel = "in_app" | "email" | "sms";

export async function notifyChannels(params: {
  userId?: string | null;
  channels: Channel[];
  title: string;
  body: string;
  metadata?: Prisma.InputJsonValue;
  /** If set and RESEND_API_KEY is present, sends transactional email */
  emailTo?: string;
  /** If set and Twilio env configured, sends SMS */
  smsTo?: string;
}) {
  for (const channel of params.channels) {
    if (channel === "in_app" && params.userId) {
      await prisma.notification.create({
        data: {
          userId: params.userId,
          channel: "in_app",
          title: params.title,
          body: params.body,
          metadata: params.metadata ?? undefined,
        },
      });
    }

    if (channel === "email" && params.emailTo) {
      await sendEmailResend(params.emailTo, params.title, params.body).catch((e) =>
        console.warn("[notify.email]", e),
      );
    }

    if (channel === "sms" && params.smsTo) {
      await sendSmsTwilio(params.smsTo, `${params.title}: ${params.body}`).catch((e) =>
        console.warn("[notify.sms]", e),
      );
    }
  }
}

async function sendEmailResend(to: string, subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "SGS <onboarding@resend.dev>";
  if (!key) {
    console.log("[notify.email:skipped]", { to, subject, text });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend failed: ${res.status} ${err}`);
  }
}

async function sendSmsTwilio(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (!sid || !token || !from) {
    console.log("[notify.sms:skipped]", { to, body });
    return;
  }

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = new URLSearchParams({ To: to, From: from, Body: body });
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twilio failed: ${res.status} ${err}`);
  }
}
