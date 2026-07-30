// features/auth/components/AuthImagePanel.tsx

import Image from "next/image";

interface AuthImagePanelProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

/**
 * پنل تصویری سمت راست صفحه‌ی احراز هویت.
 * فقط توی صفحه‌های بزرگ (lg و بالاتر) نمایش داده می‌شه؛
 * تصویر رو خودتون باید توی public/images بذارید.
 */
export function AuthImagePanel({ imageSrc, title, subtitle }: AuthImagePanelProps) {
  return (
    <div className="relative hidden h-full w-full overflow-hidden lg:block">
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />

      {/* Overlay تیره برای خوانایی متن روی عکس */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-10 pb-16 text-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="max-w-md text-sm leading-7 text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
