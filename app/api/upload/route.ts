import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Get the current timestamp in milliseconds
  const timestamp = Date.now();

  // Generate a unique filename using the timestamp and the original file extension
  const fileExtension = path.extname(file.name);
  const newFilename = `${timestamp}${fileExtension}`;

  // Get the current working directory where your project is located
  const projectDir = process.cwd();

  // Define the path where you want to save the file relative to the project directory
  const relativePath = "/public/images/" + newFilename;

  // Create the full path by joining the project directory and the relative path
  const fullPath = path.join(projectDir, relativePath);

  try {
    // Write the file to the full path with the new filename
    await writeFile(fullPath, buffer);
    console.log(`Uploaded file saved at: ${fullPath}`);
    return NextResponse.json({ success: true, path: fullPath });
  } catch (error) {
    console.error("Error saving the file:", error);
    return NextResponse.json({ success: false, error: "File upload failed" });
  }
}
