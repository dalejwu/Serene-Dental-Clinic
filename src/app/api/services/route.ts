import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(
      { success: true, data: services },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch dental services:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
