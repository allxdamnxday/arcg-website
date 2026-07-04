import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — solid background (iOS composites no transparency). Next
// auto-emits <link rel="apple-touch-icon">.
export default async function AppleIcon() {
  const bebas = new Uint8Array(
    await readFile(join(process.cwd(), "src/app/BebasNeue-Regular.ttf"))
  ).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f1f2e",
          fontFamily: "Bebas Neue",
        }}
      >
        <div style={{ display: "flex", fontSize: "96px", lineHeight: 0.9, color: "#ffffff" }}>AR</div>
        <div style={{ display: "flex", width: "48px", height: "5px", backgroundColor: "#2dd4e8", marginTop: "12px" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Bebas Neue", data: bebas, style: "normal", weight: 400 }] }
  );
}
