import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.profile.name} — ${site.profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.55), transparent 45%), radial-gradient(circle at 90% 90%, rgba(14,165,233,0.45), transparent 40%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, color: "#aaa" }}>{site.profile.name}</div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -3,
            textTransform: "uppercase",
            marginTop: 16,
          }}
        >
          {site.profile.title}
        </div>
        <div style={{ fontSize: 36, color: "#bbb", marginTop: 28 }}>
          {site.profile.tagline}
        </div>
      </div>
    ),
    size
  );
}
