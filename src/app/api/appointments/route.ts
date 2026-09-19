import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientName, patientPhone, notes, concern, preferredWhen } = body;

    const name = patientName || body.name;
    const phone = patientPhone || body.phone;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Pangalan ay kinakailangan." },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: "Wastong Philippine mobile number ay kinakailangan (hal. 0992-631-2712)." },
        { status: 400 }
      );
    }

    const referenceId = `SRN-${Date.now().toString().slice(-6)}`;

    // In a production environment, this forwards to SMS, email, or a CRM
    console.log("[NEW APPOINTMENT REQUEST]", {
      referenceId,
      name: name.trim(),
      phone: cleanPhone,
      concern: concern || notes || "General Consultation",
      preferredWhen: preferredWhen || "Earliest Available",
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Natanggap ang inyong kahilingan sa appointment. Tatawagan kayo ng aming receptionist upang kumpirmahin ang oras.",
      data: {
        referenceId,
        patientName: name.trim(),
      },
    });
  } catch (err: any) {
    console.error("[APPOINTMENT API ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Hindi ma-proseso ang kahilingan sa ngayon." },
      { status: 500 }
    );
  }
}
