import Image from "next/image";
import {ImagePanelProps} from "@/components/auth/ImagePanel/index";


export const ImagePanel = ({ imageSrc, title, subtitle }: ImagePanelProps)=> {
    return (
        <div className="relative hidden h-full w-full overflow-hidden lg:block">
            <Image
                src={imageSrc}
                alt="background auth"
                fill
                priority
                sizes="50vw"
                className="object-cover pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-7 pb-16 text-center">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
                <p className=" text-sm leading-7 text-white/80">{subtitle}</p>
            </div>
        </div>
    );
}
