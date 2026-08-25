import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Mail is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and a note are required." }, { status: 400 });
  }
  if (!emailPattern.test(email) || message.length > 4000 || name.length > 200) {
    return NextResponse.json({ error: "Check the fields and try again." }, { status: 400 });
  }

  const resend = new Resend(key);
  const from =
    process.env.RESEND_FROM ?? "Cactus Wave Media <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? site.email;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Project inquiry — ${name}${company ? ` · ${company}` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Could not send the note." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
