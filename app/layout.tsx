import { Nunito } from 'next/font/google';
import './globals.css'
import Navbar from "@/app/components/navbar/Navbar";
import ClientOnly from "@/app/components/ClientOnly";
import RegisterModal from '@/app/components/Modals/RegisterModal';
import LoginModal from "@/app/components/Modals/LoginModal";
import RentModal from "@/app/components/Modals/RentModal";
import ToasterProvider from "@/app/providers/ToastProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
    title: 'AirBnb',
    description: 'AirBnb Clone',
}

const font = Nunito({
    subsets: ["latin"],
})

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();

    return (
        <html lang="en">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider/>
                    <RegisterModal/>
                    <LoginModal/>
                    <RentModal/>
                    <Navbar currentUser={currentUser}/>
                </ClientOnly>

                {children}</body>
        </html>
    )
}
