import { SessionProvider } from "next-auth/react";
import '@/app/componets/global.css'; // or wherever your CSS is
import { poppins } from "@/app/componets/fonts"; // if you're using it

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}