"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const showFooter = !pathname.startsWith("/google-lens");

  return showFooter ? <Header /> : null;
}
