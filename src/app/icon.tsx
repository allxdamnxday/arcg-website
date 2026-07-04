import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Square, on-brand favicon generated from the same Bebas face as the OG image.
// Replaces the old icon.png, which was a byte copy of the 288×180 horizontal
// logo that browsers squashed in the tab.
export default async function Icon() {
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
        <div style={{ display: "flex", fontSize: "300px", lineHeight: 0.9, color: "#ffffff" }}>AR</div>
        <div style={{ display: "flex", width: "120px", height: "10px", backgroundColor: "#2dd4e8", marginTop: "28px" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Bebas Neue", data: bebas, style: "normal", weight: 400 }] }
  );
}
