// features/onboarding/components/AvatarUploader.tsx

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, UserRound } from "lucide-react";
import {
  ACCEPTED_AVATAR_TYPES,
  MAX_AVATAR_SIZE_MB,
} from "../models/onboarding.types";

interface AvatarUploaderProps {
  previewUrl: string | null;
  onChange: (file: File | null) => void;
}

export function AvatarUploader({ previewUrl, onChange }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      setLocalError("فرمت فایل باید JPG، PNG یا WebP باشد");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE_MB * 1024 * 1024) {
      setLocalError(`حجم فایل نباید بیشتر از ${MAX_AVATAR_SIZE_MB} مگابایت باشد`);
      return;
    }

    setLocalError(null);
    onChange(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-28 w-28">
        <div className="h-full w-full overflow-hidden rounded-full border border-border bg-surface">
          {previewUrl ? (
            <Image src={previewUrl} alt="" width={112} height={112} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserRound className="h-12 w-12 text-text-muted" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 left-0 flex h-7 w-7 items-center justify-center rounded-full
                     bg-primary text-text-on-primary transition-colors hover:bg-primary-hover"
          aria-label="افزودن عکس پروفایل"
        >
          <Camera className="h-4 w-4" />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_AVATAR_TYPES.join(",")}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm font-medium text-primary hover:text-primary-hover"
      >
        افزودن عکس پروفایل
      </button>
      {/*<p className="text-xs text-text-muted">JPG، PNG یا WebP. حداکثر {MAX_AVATAR_SIZE_MB} مگابایت.</p>*/}
      {localError && <p className="text-xs text-danger-text">{localError}</p>}
    </div>
  );
}
