import { NextResponse} from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    const filePath = path.join(process.cwd(), "..", "profits-log.json");

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "profitsファイルが存在しません" }, { status: 404 });
    }

    const data = fs.readFileSync(filePath, "utf-8")
    const profits = JSON.parse(data);
    return NextResponse.json(profits);
}