import { ContactSchema } from "@/features/contact/schemas/ContactSchema";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = ContactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Datos de formulario inválidos" },
        { status: 400 },
      );
    }

    const { name, email, option, message } = validatedData.data;
    const optionText = option.text;

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "damrod1999@gmail.com",
      subject: `${name} - ${optionText}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2>Nueva consulta desde el Portfolio</h2>
          <hr style="border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Opción de consulta:</strong> ${optionText}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { error: "Ocurrió un error al enviar el correo" },
      { status: 500 },
    );
  }
}
