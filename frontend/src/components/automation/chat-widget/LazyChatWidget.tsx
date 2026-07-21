"use client";
import dynamic from "next/dynamic";

const LazyChatWidget = dynamic(
  () => import("./ChatWidget").then((mod) => mod.default),
  { ssr: false, loading: () => null },
);

export default function ChatWidgetWrapper() {
  return <LazyChatWidget />;
}
