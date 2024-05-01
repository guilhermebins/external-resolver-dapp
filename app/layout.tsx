"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThorinGlobalStyles, lightTheme } from "../lib/thorin";
import { ThemeProvider } from "../lib/styled-components";
import { Provider } from "react-redux";
import nameRegistrationStore from "@/lib/store";
import { Header } from "@/components/01-atoms/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={nameRegistrationStore}>
      <ThemeProvider theme={lightTheme}>
        <ThorinGlobalStyles />
        <html lang="en">
          <body className={`${inter.className} h-screen flex flex-col`}>
            <Header />
            <main className="relative z-10 h-full flex-grow">{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
  );
}
