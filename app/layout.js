import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWraper from "./components/SessionWraper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Locus - Stock Management System",
  description: "Manage your stocks easily with Locus Stock Management System.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWraper>{children}</SessionWraper>
      </body>
    </html>
  );
}
