/**
 * Design token bridge for styled-components ThemeProvider.
 *
 * Two theme objects (lightTheme / darkTheme) are exported. UserPreferencesContext
 * in src/features/theme/UserPreferencesContext.tsx selects between them based on
 * user preference (localStorage → OS fallback). All colors are plain TypeScript
 * values — no CSS custom properties.
 *
 * Token vocabulary follows the FastChickens HR Design System (ADR-0009,
 * extended by ADR-0042):
 *   canvas / surface / surface2  — background layers
 *   ink / muted / subtle         — text hierarchy
 *   border / borderStrong        — stroke hierarchy
 *   brand / brandHover / brandSoft — signal color (use sparingly); distinct
 *     from the `error` status color even though both are red
 *   success / warning / error / info + soft variants — semantic status
 *
 * Neutrals (canvas/surface/border/ink/muted/subtle) are drawn from Tailwind's
 * published `slate` scale in light mode, and from GitHub Primer's dark-theme
 * values in dark mode (ADR-0042) — not the slate scale, since Primer's dark
 * neutrals are tuned as a set for that specific near-black canvas.
 * success/warning/error are drawn from Tailwind's published green/yellow/red
 * scales in both modes (`scales` below), just at a lighter-numbered, more
 * legible shade in dark mode.
 *
 * Fixed colors (ink900, brand500 etc.) do NOT flip with dark mode and are
 * safe to use in always-dark contexts like the sidebar.
 */
export declare const scales: {
    slate: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    red: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    yellow: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
    green: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    };
};
export declare const lightTheme: {
    colors: {
        canvas: string;
        surface: string;
        surface2: string;
        border: string;
        borderStrong: string;
        ink: string;
        muted: string;
        subtle: string;
        onFill: string;
        brand: string;
        brandHover: string;
        brandSoft: string;
        success: string;
        successSoft: string;
        warning: string;
        warningSoft: string;
        error: string;
        errorSoft: string;
        info: string;
        infoSoft: string;
        accent: string;
        accentSoft: string;
        oe: string;
        oeSoft: string;
        oeFaint: string;
        white: string;
        black: string;
        transparent: string;
        ink900: string;
        ink800: string;
        ink700: string;
        ink600: string;
        ink400: string;
        ink300: string;
        ink50: string;
        brand50: string;
        brand200: string;
        brand500: string;
        brand600: string;
        brand800: string;
    };
    fixed: {
        white: string;
        black: string;
        transparent: string;
        ink900: string;
        ink800: string;
        ink700: string;
        ink600: string;
        ink400: string;
        ink300: string;
        ink50: string;
        brand50: string;
        brand200: string;
        brand500: string;
        brand600: string;
        brand800: string;
    };
    scales: {
        slate: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        red: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        yellow: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        green: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
    };
    fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
        extrabold: string;
        black: string;
    };
    lineHeight: {
        flat: string;
        snugTight: string;
        tight: string;
        snug: string;
        normal: string;
        relaxed: string;
        loose: string;
    };
    letterSpacing: {
        tight: string;
        normal: string;
        wide: string;
    };
    typography: {
        fontFamily: {
            display: string;
            sans: string;
            mono: string;
        };
    };
    borderRadius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    spacing: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
    };
    boxShadow: {
        card: string;
        pop: string;
        none: string;
    };
    screens: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    zIndex: {
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        auto: string;
    };
    motion: {
        readonly duration: {
            readonly fast: "150ms";
            readonly base: "220ms";
            readonly slow: "280ms";
        };
        readonly easing: {
            readonly enter: "cubic-bezier(0.22, 1, 0.36, 1)";
            readonly exit: "cubic-bezier(0.4, 0, 1, 1)";
            readonly standard: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
};
export declare const darkTheme: {
    colors: {
        canvas: string;
        surface: string;
        surface2: string;
        border: string;
        borderStrong: string;
        ink: string;
        muted: string;
        subtle: string;
        onFill: string;
        brand: string;
        brandHover: string;
        brandSoft: string;
        success: string;
        successSoft: string;
        warning: string;
        warningSoft: string;
        error: string;
        errorSoft: string;
        info: string;
        infoSoft: string;
        accent: string;
        accentSoft: string;
        oe: string;
        oeSoft: string;
        oeFaint: string;
        white: string;
        black: string;
        transparent: string;
        ink900: string;
        ink800: string;
        ink700: string;
        ink600: string;
        ink400: string;
        ink300: string;
        ink50: string;
        brand50: string;
        brand200: string;
        brand500: string;
        brand600: string;
        brand800: string;
    };
    fixed: {
        white: string;
        black: string;
        transparent: string;
        ink900: string;
        ink800: string;
        ink700: string;
        ink600: string;
        ink400: string;
        ink300: string;
        ink50: string;
        brand50: string;
        brand200: string;
        brand500: string;
        brand600: string;
        brand800: string;
    };
    scales: {
        slate: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        red: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        yellow: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        green: {
            50: string;
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
    };
    fontSize: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
    };
    fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
        extrabold: string;
        black: string;
    };
    lineHeight: {
        flat: string;
        snugTight: string;
        tight: string;
        snug: string;
        normal: string;
        relaxed: string;
        loose: string;
    };
    letterSpacing: {
        tight: string;
        normal: string;
        wide: string;
    };
    typography: {
        fontFamily: {
            display: string;
            sans: string;
            mono: string;
        };
    };
    borderRadius: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        full: string;
    };
    spacing: {
        none: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
    };
    boxShadow: {
        card: string;
        pop: string;
        none: string;
    };
    screens: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    zIndex: {
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        auto: string;
    };
    motion: {
        readonly duration: {
            readonly fast: "150ms";
            readonly base: "220ms";
            readonly slow: "280ms";
        };
        readonly easing: {
            readonly enter: "cubic-bezier(0.22, 1, 0.36, 1)";
            readonly exit: "cubic-bezier(0.4, 0, 1, 1)";
            readonly standard: "cubic-bezier(0.4, 0, 0.2, 1)";
        };
    };
};
export type AppTheme = typeof lightTheme;
export type FontSizePreference = 'STANDARD' | 'LARGE' | 'EXTRA_LARGE';
/**
 * Root <html> font-size percentage per FontSizePreference level. The whole
 * rem-based fontSize scale above grows proportionally from this — no
 * per-token overrides. STANDARD (112.5%) is also the default set directly in
 * index.css, so unauthenticated/marketing pages get the same baseline
 * without needing a UserPreferencesProvider to apply it first.
 */
export declare const fontSizeScale: Record<FontSizePreference, number>;
/**
 * Only DEFAULT exists today — no font style has been chosen yet. Reserved so
 * choosing real fonts later is additive, not a schema migration.
 */
export type FontFamilyPreference = 'DEFAULT';
export * from './typography';
import './styled';
