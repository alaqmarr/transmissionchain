"use client";

import { usePathname } from "next/navigation";

export default function HideOnRoutes({
  children,
  routes,
}: {
  children: React.ReactNode;
  routes: string[];
}) {
  const pathname = usePathname();
  const shouldHide = routes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;
  return <>{children}</>;
}
