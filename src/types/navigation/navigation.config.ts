import { Home, Dumbbell, Search, Send } from "lucide-react";
import type { NavItem } from "./navigation.types";


/**
 * Single source of truth for navigation.
 *
 * Defined once at module scope (not inside a component) so the
 * array and every item object keep a stable reference across renders —
 * this is what lets React.memo on <SidebarItem> actually skip work,
 * and avoids feeding new array/object identities into hooks or JSX
 * on every render.
 *
 * `showOnMobile` lets desktop and mobile derive their item lists from
 * this one array instead of maintaining two separate lists.
//  */
//
// /** Derived once at module load — not recomputed per render. */
// export const MOBILE_NAV_ITEMS: readonly NavItem[] = NAV_ITEMS.filter(
//     (item) => item.showOnMobile
// );

/** Collapsed / expanded sidebar widths in px, used by both the view-model and the view. */
export const SIDEBAR_COLLAPSED_WIDTH = 80;
export const SIDEBAR_EXPANDED_WIDTH = 240;