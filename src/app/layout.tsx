import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Titan OS</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
