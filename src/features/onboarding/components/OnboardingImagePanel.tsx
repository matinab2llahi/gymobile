// features/onboarding/components/OnboardingImagePanel.tsx

import Image from "next/image";

interface OnboardingImagePanelProps {
  imageSrc: string;
  title: string;
  subtitle: string;
}

/**
 * Left-side visual panel. Desktop only (lg and up); the image itself
 * needs to be placed in public/images by whoever wires this up.
 */
export function OnboardingImagePanel({ imageSrc, title, subtitle }: OnboardingImagePanelProps) {
  return (
    <div className="relative hidden h-full w-full overflow-hidden lg:block">
      <Image src={imageSrc} alt="" fill priority sizes="50vw" className="object-cover" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-10 pb-16 text-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="max-w-md text-sm leading-7 text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
