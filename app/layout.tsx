import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./provider/ToasterProvider";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import Container from "./components/Container";
import { StoreProvider } from "./Redux/StoreProvider";
import Footer from "./components/Footer/Footer";
import { websiteName } from "@/data";
import PaymentMethodModal from "./components/modals/PaymentMethodModal";
import Image from "next/image";
export const metadata: Metadata = {
  title: ` ${websiteName}`,
  description: ` ${websiteName}`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 relative w-full flex flex-col">
        <StoreProvider>
          <ClientOnly>
            <ToasterProvider />
            <PaymentMethodModal />
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="h-full w-full flex-grow">
            <Container>{children}</Container>
          </div>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
