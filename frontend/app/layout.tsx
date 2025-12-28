import "../styles/globals.css";

export const metadata = {
  title: "EU AI Act Compliance Checker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
