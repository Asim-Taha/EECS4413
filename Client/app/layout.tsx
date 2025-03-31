import '@/app/componets/global.css'
import { poppins } from "@/app/componets/fonts";

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="eng">
      <body className={`${poppins.className} antialased`}>{children}</body>
    </html>
  )
}