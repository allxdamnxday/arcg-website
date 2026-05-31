import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AR Contract Glazing — Commercial Glazing, Los Angeles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          justifyContent: "center",
          backgroundColor: "#0f1f2e",
          padding: "90px",
          fontFamily: "Bebas Neue",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "8px",
            backgroundColor: "#4a7fa5",
            marginBottom: "44px",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: "150px",
            lineHeight: 0.92,
            letterSpacing: "2px",
            color: "#ffffff",
          }}
        >
          AR CONTRACT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "150px",
            lineHeight: 0.92,
            letterSpacing: "2px",
            color: "#A8B5C2",
          }}
        >
          GLAZING
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "40px",
            letterSpacing: "10px",
            color: "#7fa3c0",
            marginTop: "48px",
          }}
        >
          CURTAIN WALL · WINDOWS · STOREFRONT
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            letterSpacing: "8px",
            color: "#6b7d91",
            marginTop: "14px",
          }}
        >
          LOS ANGELES · WORKING NATIONWIDE
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bebas Neue", data: bebas, style: "normal", weight: 400 }],
    }
  );
}
