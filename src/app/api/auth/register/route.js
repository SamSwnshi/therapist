import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const API_URL = process.env.API_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: error.message || error },
      { status: 500 }
    );
  }
}
