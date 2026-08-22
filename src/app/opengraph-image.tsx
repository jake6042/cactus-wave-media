import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { brand, brandColors } from "@/lib/brand";

export const alt = `${brand.name} — ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
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
          color: brandColors.bone.hex,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${mark.toString("base64")}`}
            width={72}
            height={72}
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 28,
            }}
          >
            <div
              style={{
                fontSize: 18,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              {brand.shortName}
            </div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: brandColors.brass.hex,
                marginTop: 6,
              }}
            >
              {brand.unit}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 0.9 }}>Presence</div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 0.9,
              color: "#C9C2B6",
              fontStyle: "italic",
            }}
          >
            that holds.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: brandColors.brass.hex,
          }}
        >
          {brand.idea}
        </div>
      </div>
    ),
    { ...size },
  );
}
