import { Nunito } from 'next/font/google';
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from '@/app/components/Modals/RegisterModal';
import ToasterProvider from "@/app/providers/ToastProvider";

export const metadata = {
    title: 'AirBnb',
    description: 'AirBnb Clone',
}

const font = Nunito({
    subsets: ["latin"],
})

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // @ts-ignore
    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider/>
                    <RegisterModal/>
                    <Navbar />
                </ClientOnly>

                {children}</body>
        </html>
    )
}
