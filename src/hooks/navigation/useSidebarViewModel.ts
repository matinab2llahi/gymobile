"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH} from "@/types/navigation/navigation.config";
import {isNavItemActive} from "@/utils/navigation/navigation.utils";

/**
 * Owns all interaction logic for the desktop sidebar:
 *  - hover-to-expand animation
 *  - active-route detection
 *
 * Deliberately holds NO React state for the hover/expanded flag.
 * mouseenter/mouseleave are attached directly to the DOM node in a
 * ref callback effect and drive a GSAP timeline imperatively, so
 * hovering the sidebar never triggers a React re-render of the
 * sidebar (or anything else) — only GSAP mutates styles directly.
 *
 * `usePathname` is the one piece of React state here, and it's
 * necessary: the active item genuinely needs to update on navigation.
 * That re-render is scoped to this hook's consumer (the Sidebar
 * component), not the rest of the app.
 */
export function useSidebarViewModel() {
    const pathname = usePathname();
    const containerRef = useRef<HTMLElement | null>(null);
    const labelRefs = useRef<HTMLSpanElement[]>([]);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // Ref callback passed to each label span; collects them for the
    // GSAP timeline without needing state or effects per-item.
    const registerLabel = useCallback((el: HTMLSpanElement | null) => {
        if (el && !labelRefs.current.includes(el)) {
            labelRefs.current.push(el);
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const duration = prefersReducedMotion ? 0 : 0.2;

        gsap.set(container, { width: SIDEBAR_COLLAPSED_WIDTH });
        gsap.set(labelRefs.current, { autoAlpha: 0, x: -6 });

        const tl = gsap.timeline({ paused: true, defaults: { duration, ease: "power2.out" } });
        tl.to(container, { width: SIDEBAR_EXPANDED_WIDTH }, 0).to(
            labelRefs.current,
            { autoAlpha: 1, x: 0, stagger: prefersReducedMotion ? 0 : 0.015 },
            0.05
        );
        timelineRef.current = tl;

        const handleEnter = () => tl.play();
        const handleLeave = () => tl.reverse();

        container.addEventListener("mouseenter", handleEnter);
        container.addEventListener("mouseleave", handleLeave);
        // Keyboard users tabbing into the links should get the same reveal.
        container.addEventListener("focusin", handleEnter);
        container.addEventListener("focusout", handleLeave);

        return () => {
            container.removeEventListener("mouseenter", handleEnter);
            container.removeEventListener("mouseleave", handleLeave);
            container.removeEventListener("focusin", handleEnter);
            container.removeEventListener("focusout", handleLeave);
            tl.kill();
        };
        // Runs once on mount; the timeline targets are stable refs, not state.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isActive = useCallback((href: string) => isNavItemActive(pathname, href), [pathname]);

    return { containerRef, registerLabel, isActive };
}