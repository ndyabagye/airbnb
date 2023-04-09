import { Nunito } from 'next/font/google';
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from '@/app/components/Modals/RegisterModal';

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
                    <RegisterModal/>
                    {/* <Modal actionLabel="Submit" isOpen /> */}
                    <Navbar />
                </ClientOnly>

                {children}</body>
        </html>
    )
}
