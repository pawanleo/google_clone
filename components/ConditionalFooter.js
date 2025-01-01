"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const showFooter = !pathname.startsWith("/google-lens");

  return showFooter ? <Footer /> : null;
}
