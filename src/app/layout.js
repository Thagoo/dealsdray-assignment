import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DealsDray assignment",
  description: "this is a assignment from dealsdray",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen px-24 py-6">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
