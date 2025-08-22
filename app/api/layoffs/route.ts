import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const layoffs = db
        .prepare(
            `SELECT layoffs.*, companies.company_name, companies.HQ_city, companies.company_headcount
      FROM layoffs
      JOIN companies ON layoffs.company_id = companies.id;`
        )
        .all();
    return NextResponse.json(layoffs);
}
