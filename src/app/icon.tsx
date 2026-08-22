import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const mark = await readFile(
    join(process.cwd(), "public/brand/mark-bone.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: brandColors.ink.hex,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${mark.toString("base64")}`}
          width={24}
          height={24}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
