import {ReactNode} from "react";
import {ImagePanel} from "@/components/ImagePanel/ImagePanel";

interface AuthLayoutProps {
    children: ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <>
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2 " dir="rtl">
                {children}
                <ImagePanel
                    imageSrc="/images/login/1300550.jpg"
                    title="آماده‌ی پیشرفت واقعی؟"
                    subtitle="برنامه‌ی تمرینی شخصی‌سازی‌شده، پیگیری پیشرفت و ارتباط مستقیم با مربی، همه توی یک اپ."
                />
            </div>
        </>
    )
}