"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isLogin = pathname.startsWith("/login");
  const isSetup = pathname.startsWith("/setup");
  const hideChrome = isAdmin || isLogin || isSetup;

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-grow">{children}</main>
      {footer}
    </>
  );
}
