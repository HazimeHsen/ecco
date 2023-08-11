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
import { StoreProvider } from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hazime Shop",
  description: "Hazime Shop",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <StoreProvider>
          <ClientOnly>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <Container>
              <Navbar currentUser={currentUser} />
            </Container>
          </ClientOnly>
          <Container>{children}</Container>
        </StoreProvider>
      </body>
    </html>
  );
}
