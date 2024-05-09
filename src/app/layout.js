import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DealsDray assignment",
  description: "this is a assignment from dealsdray",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="px-2 md:px-24 py-2 flex-grow">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
