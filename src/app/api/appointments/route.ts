import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        dentist: true,
      },
      orderBy: { date: "asc" },
    });
    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, dentistId, patientName, patientEmail, patientPhone, notes, date, timeSlot } = body;

    // Check if this is an express booking (Name + Phone + concern)
    let finalServiceId = serviceId;
    let finalDentistId = dentistId;
    let finalEmail = patientEmail ? patientEmail.trim().toLowerCase() : "";
    let finalDate = date;
    let finalTimeSlot = timeSlot;

    if (!patientName || !patientPhone) {
      return NextResponse.json(
        { success: false, error: "Pangalan at cellphone number ay kailangan para sa appointment." },
        { status: 400 }
      );
    }

    // If express booking without chosen dentist/service/slot, assign defaults
    if (!finalDentistId) {
      const firstDentist = await prisma.dentist.findFirst();
      finalDentistId = firstDentist?.id;
    }
    if (!finalServiceId) {
      const firstService = await prisma.service.findFirst();
      finalServiceId = firstService?.id;
    }
    if (!finalEmail) {
      const cleanNum = patientPhone.replace(/\D/g, "");
      finalEmail = `${cleanNum || "patient"}@reception.serenedental.ph`;
    }
    if (!finalDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      finalDate = tomorrow.toISOString().split("T")[0];
    }
    if (!finalTimeSlot) {
      finalTimeSlot = "10:00 AM (Pending Reception Triage)";
    }

    // Check if slot already booked with the specific doctor (if specific date/slot chosen)
    if (dentistId && date && timeSlot) {
      const existing = await prisma.appointment.findFirst({
        where: {
          dentistId,
          date,
          timeSlot,
          status: { not: "CANCELLED" },
        },
      });

      if (existing) {
        return NextResponse.json(
          { success: false, error: "This time slot is already booked with the selected dentist. Please choose another time." },
          { status: 409 }
        );
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        serviceId: finalServiceId!,
        dentistId: finalDentistId!,
        patientName: patientName.trim(),
        patientEmail: finalEmail,
        patientPhone: patientPhone.trim(),
        notes: notes ? notes.trim() : null,
        date: finalDate,
        timeSlot: finalTimeSlot,
        status: "CONFIRMED",
      },
      include: {
        service: true,
        dentist: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: appointment,
      message: "Appointment confirmed successfully!",
    });
  } catch (error: any) {
    console.error("Failed to create appointment:", error);
    return NextResponse.json(
      { success: false, error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
