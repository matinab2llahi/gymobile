import Image from "next/image";
import { Bell, Settings, UserRound } from "lucide-react";
import {ProfileHeaderProps} from "@/components/profile-header/index";

/**
 * Presentational only. Everything renders straight from props — no fetching,
 * no state, no store. Stays a plain Server Component: nothing here needs
 * the browser, so it ships no client JS and its content is present in the
 * initial server-rendered HTML.
 */
export function ProfileHeader({
                                  avatar,
                                  username,
                                  teacher_counts,
                                  student_counts,
                                  plans,
                                  bio,
                                  skills,
                                  isOwner,
                              }: ProfileHeaderProps) {
    const hasBio = Boolean(bio && bio.trim().length > 0);
    const hasSkills = skills.length > 0;

    return (
        <header className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
                {/* Avatar */}
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface-secondary sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                    {avatar ? (
                        <Image
                            src={avatar}
                            alt={`${username}'s avatar`}
                            fill
                            sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 96px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
                            <UserRound className="h-1/2 w-1/2 text-text-muted" strokeWidth={1.5} />
                        </div>
                    )}
                </div>

                {/* Info column */}
                <div className="flex w-full flex-col gap-4 text-center sm:text-left">
                    {/* Username + settings/notification icons */}
                    <div className="flex items-center justify-center gap-1 sm:justify-start">
                        <h1 className="text-lg font-semibold text-text-primary">{username}</h1>

                        {/* More prominent on large screens, smaller and less dominant on mobile */}
                        <button
                            type="button"
                            aria-label="Notifications"
                            className="hidden rounded-full p-1.5 text-text-secondary transition-colors hover:bg-surface-secondary lg:inline-flex"
                        >
                            <Bell className="h-5 w-5" strokeWidth={1.75} />
                        </button>
                        <button
                            type="button"
                            aria-label="Settings"
                            className="inline-flex rounded-full p-1 text-text-secondary transition-colors hover:bg-surface-secondary lg:p-1.5"
                        >
                            <Settings className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={1.75} />
                        </button>
                    </div>

                    {/* Owner-dependent action button. Message is intentionally absent — handled elsewhere. */}
                    <div className="flex justify-center sm:justify-start">
                        {isOwner ? (
                            <button
                                type="button"
                                className="rounded-lg border border-border bg-surface-secondary px-4 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
                            >
                                Edit profile
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="rounded-lg bg-primary px-5 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active"
                            >
                                Follow
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center gap-6 sm:justify-start" aria-label="Profile stats">
            <span className="text-sm text-text-secondary">
              <strong className="text-base font-semibold text-text-primary">{plans}</strong>{" "}
                plans
            </span>
                        <span className="text-sm text-text-secondary">
              <strong className="text-base font-semibold text-text-primary">
                {teacher_counts}
              </strong>{" "}
                            teachers
            </span>
                        <span className="text-sm text-text-secondary">
              <strong className="text-base font-semibold text-text-primary">
                {student_counts}
              </strong>{" "}
                            students
            </span>
                    </div>

                    {/* Bio — no empty container when null/blank */}
                    {hasBio && (
                        <p className="max-w-md text-sm leading-relaxed text-text-primary">{bio}</p>
                    )}

                    {/* Skills — visual-only links, no real routes yet */}
                    {hasSkills && (
                        <ul className="flex flex-wrap justify-center gap-2 sm:justify-start">
                            {skills.map((skill) => (
                                <li key={skill.id}>
                                    <a
                                        className="inline-block rounded-full bg-primary-bg px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                                    >
                                        #{skill.title.trim().toLowerCase().replace(/\s+/g, "_")}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}