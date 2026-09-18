import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_DENTISTS } from "@/lib/defaultData";

export async function GET() {
  try {
    const dentists = await prisma.dentist.findMany({
      orderBy: { experienceYears: "desc" },
    });
    if (!dentists || dentists.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_DENTISTS });
    }
    return NextResponse.json(
      { success: true, data: dentists },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch dentists from DB, serving fallback data:", error);
    return NextResponse.json({ success: true, data: DEFAULT_DENTISTS });
  }
}
