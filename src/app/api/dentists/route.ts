import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dentists = await prisma.dentist.findMany({
      orderBy: { experienceYears: "desc" },
    });
    return NextResponse.json(
      { success: true, data: dentists },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch dentists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dentists" },
      { status: 500 }
    );
  }
}
