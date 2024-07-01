"use client";
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store }  from "../store";
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex",
          fontSans.variable
        )}
      >
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
