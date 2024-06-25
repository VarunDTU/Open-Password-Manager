import { Inter } from "next/font/google";
import NewNavbar from "./components/navbar";
import "./globals.css";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Password Manager",
  description: "Saves your passwords securely",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <NewNavbar></NewNavbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
