// Root layout — minimal shell.
// The real layout (with HTML, head, body, providers) lives in app/[locale]/layout.tsx
// Next.js requires this file to exist at the root level.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

