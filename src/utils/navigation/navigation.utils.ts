/**
 * Determines whether a nav item should be shown as active for a given pathname.
 * Pure function, no React involved — safe to call from a client hook or a
 * plain component, and trivial to unit test.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
}