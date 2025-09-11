import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/Toast";
import { GoogleAnalytics } from '@next/third-parties/google'

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "X-Club - Nền tảng kết nối cộng đồng",
  description: "X-Club - Nền tảng kết nối con người qua từng bước chạy, biến việc chạy bộ thành trải nghiệm có ý nghĩa xã hội",
  keywords: "x-club, chạy bộ, fitness, cộng đồng, câu lạc bộ, giải chạy, gây quỹ",
  authors: [{ name: "X-Club Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-theme="pastel">
      <body
        className={`${beVietnamPro.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
