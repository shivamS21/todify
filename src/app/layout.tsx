import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from 'next/font/google';
import { Provider } from "./provider";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "todify",
  description: "Full-stack project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={openSans.className}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
