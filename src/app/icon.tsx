import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Bone glyph on ink — `public/brand/avatar.png`. */
export default async function Icon() {
  const avatar = await readFile(
    join(process.cwd(), "public/brand/avatar.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${avatar.toString("base64")}`}
          width={32}
          height={32}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
