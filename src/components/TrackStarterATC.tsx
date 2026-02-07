"use client";

import { useEffect } from "react";

export default function TrackStarterATC() {
  useEffect(() => {
    console.log("🔥 TRACKER MOUNTED");

    const btn = document.querySelector('[data-cta="starter-199k"]');
    console.log("👉 BTN FOUND:", btn);

    if (!btn) return;

    const handleClick = () => {
      console.log("✅ BUTTON CLICKED");

      if ((window as any).ttq) {
        console.log("🚀 FIRE ADD TO CART");
        (window as any).ttq.track("AddToCart", {
          content_id: "starter",
          content_type: "product",
          value: 199000,
          currency: "VND",
        });
      } else {
        console.log("❌ TTQ NOT FOUND");
      }
    };

    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
