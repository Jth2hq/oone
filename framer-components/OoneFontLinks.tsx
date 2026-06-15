import React from "react";

const HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=IBM+Plex+Mono:wght@300;400&family=Space+Mono:wght@400&display=swap";

/** Add once near the root of your Framer page (or use Site Settings → Custom Code). */
export default function OoneFontLinks() {
  return <link rel="stylesheet" href={HREF} />;
}
