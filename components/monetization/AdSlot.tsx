"use client";

import React from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "vertical" | "fluid";
  className?: string;
  height?: number;
  layout?: "in-article" | "multiplex";
  layoutKey?: string;
}

export default function AdSlot(props: AdSlotProps) {
  return null;
}
