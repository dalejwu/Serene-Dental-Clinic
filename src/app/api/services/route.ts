import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SERVICES } from "@/lib/defaultData";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
    if (!services || services.length === 0) {
      return NextResponse.json({ success: true, data: DEFAULT_SERVICES });
    }
    return NextResponse.json(
      { success: true, data: services },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch dental services from DB, serving fallback data:", error);
    return NextResponse.json({ success: true, data: DEFAULT_SERVICES });
  }
}
