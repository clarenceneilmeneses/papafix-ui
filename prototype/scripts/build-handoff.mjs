/* Generates the handoff token files from src/styles/tokens.css.
 *
 * tokens.css is the single source of truth. These outputs are derived, so
 * they cannot drift — run `npm run handoff` after changing a token.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const src = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');

mkdirSync(resolve(root, 'handoff'), { recursive: true });
// Also published under /public so the prototype can offer them as downloads.
mkdirSync(resolve(root, 'public/handoff'), { recursive: true });

/** Write to handoff/ and to public/handoff/ so the two never diverge. */
const emit = (name, body) => {
  writeFileSync(resolve(root, 'handoff', name), body, 'utf8');
  writeFileSync(resolve(root, 'public/handoff', name), body, 'utf8');
  console.log(`handoff/${name}`);
};

const BANNER = `/* PapaFix design tokens — GENERATED, do not edit.
 * Source: src/styles/tokens.css   Regenerate: npm run handoff
 */`;

/* ---------------------------------------------------------------- CSS ---- */
emit('papafix-tokens.css', `${BANNER}\n\n${src}`);

/* --------------------------------------------------------------- Dart ---- */
const decls = new Map();
// Not line-anchored: tokens.css puts the size/line/weight triple on one line.
for (const [, name, value] of src.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;{}]+);/gi)) {
  decls.set(name, value.trim());
}

const hex = (n) => {
  const v = decls.get(n);
  if (!v || !/^#[0-9a-f]{6}$/i.test(v)) return null;
  return `0xFF${v.slice(1).toUpperCase()}`;
};
const px = (n) => {
  const v = decls.get(n);
  const m = v && v.match(/^(-?[\d.]+)px$/);
  return m ? m[1] : null;
};

const colour = (dart, token) => {
  const h = hex(token);
  return h ? `  static const ${dart} = Color(${h}); // ${token}` : null;
};

const COLOURS = [
  ['primary', '--primary'], ['onPrimary', '--on-primary'],
  ['primaryContainer', '--primary-container'], ['onPrimaryContainer', '--on-primary-container'],
  ['accent', '--accent'], ['onAccent', '--on-accent'],
  ['accentContainer', '--accent-container'], ['onAccentContainer', '--on-accent-container'],
  ['primaryBright', '--primary-bright'], ['primaryDeep', '--primary-deep'],
  ['accentBright', '--accent-bright'], ['accentDeep', '--accent-deep'],
  ['surface', '--surface'], ['surfaceLowest', '--surface-container-lowest'],
  ['surfaceContainer', '--surface-container'],
  ['onSurface', '--on-surface'], ['onSurfaceVariant', '--on-surface-variant'],
  ['outline', '--outline'], ['outlineVariant', '--outline-variant'],
  ['error', '--error'], ['onError', '--on-error'],
  ['errorContainer', '--error-container'], ['onErrorContainer', '--on-error-container'],
  ['success', '--success'], ['successContainer', '--success-container'],
  ['warning', '--warning'], ['warningContainer', '--warning-container'],
  ['neutral', '--neutral'], ['neutralContainer', '--neutral-container'],
];

const SPACE = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const RADII = ['sm', 'md', 'lg', 'xl'];
const TYPE = [
  ['headlineLarge', 'headline-lg'], ['headlineSmall', 'headline-sm'],
  ['titleLarge', 'title-lg'], ['titleMedium', 'title-md'],
  ['bodyLarge', 'body-lg'], ['bodyMedium', 'body-md'],
  ['labelLarge', 'label-lg'], ['labelSmall', 'label-sm'],
];
const TRACKING = {
  headlineLarge: '-0.7', headlineSmall: '-0.4', titleLarge: '-0.2',
  labelSmall: '0.8',
};

const dart = `// PapaFix design tokens — GENERATED, do not edit.
// Source: src/styles/tokens.css   Regenerate: npm run handoff
//
// Usage:  MaterialApp(theme: papaFixTheme())
// Read spacing/radii/status colours off the context:
//   final s = Theme.of(context).extension<AppSpacing>()!;
//   Padding(padding: EdgeInsets.all(s.lg), ...)

import 'package:flutter/material.dart';

class AppColors {
${COLOURS.map(([d, t]) => colour(d, t)).filter(Boolean).join('\n')}
}

/// 4pt base. The page gutter is [xl].
@immutable
class AppSpacing extends ThemeExtension<AppSpacing> {
  const AppSpacing();
${SPACE.map((k) => {
  const name = /^\d/.test(k) ? `s${k.replace(/(\d)(\w+)/, '$1$2')}` : k;
  return `  final double ${name} = ${px(`--space-${k}`)};`;
}).join('\n')}

  @override
  AppSpacing copyWith() => const AppSpacing();
  @override
  AppSpacing lerp(ThemeExtension<AppSpacing>? other, double t) => this;
}

/// Four steps, each with exactly one job. See DESIGN-SYSTEM.md §3.
@immutable
class AppRadii extends ThemeExtension<AppRadii> {
  const AppRadii();
${RADII.map((k) => `  final double ${k} = ${px(`--radius-${k}`)};`).join('\n')}
  final double full = 999;

  @override
  AppRadii copyWith() => const AppRadii();
  @override
  AppRadii lerp(ThemeExtension<AppRadii>? other, double t) => this;
}

/// Status roles used by the single StatusPill widget.
@immutable
class StatusColors extends ThemeExtension<StatusColors> {
  const StatusColors();
  final Color success = AppColors.success;
  final Color successContainer = AppColors.successContainer;
  final Color warning = AppColors.warning;
  final Color warningContainer = AppColors.warningContainer;
  final Color neutral = AppColors.neutral;
  final Color neutralContainer = AppColors.neutralContainer;

  @override
  StatusColors copyWith() => const StatusColors();
  @override
  StatusColors lerp(ThemeExtension<StatusColors>? other, double t) => this;
}

/// A gradient is a brand moment, not a decoration: hero, primary button and
/// onboarding art only.
class AppGradients {
  static const primary = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.primaryBright, AppColors.primary, AppColors.primaryDeep],
    stops: [0.0, 0.45, 1.0],
  );
  static const accent = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [AppColors.accentBright, AppColors.accentDeep, AppColors.accentDeep],
    stops: [0.0, 0.55, 1.0],
  );
}

/// Two-layer shadows: a tight contact shadow plus a wide ambient one.
class AppShadows {
  static const level1 = <BoxShadow>[
    BoxShadow(color: Color(0x0D1A1C19), blurRadius: 2, offset: Offset(0, 1)),
    BoxShadow(color: Color(0x0A1A1C19), blurRadius: 3, offset: Offset(0, 1)),
  ];
  static const level2 = <BoxShadow>[
    BoxShadow(color: Color(0x0D1A1C19), blurRadius: 4, offset: Offset(0, 2)),
    BoxShadow(color: Color(0x121A1C19), blurRadius: 14, offset: Offset(0, 6)),
  ];
  static const level3 = <BoxShadow>[
    BoxShadow(color: Color(0x1F1A1C19), blurRadius: 20, offset: Offset(0, 6)),
  ];
  // A grey shadow under a saturated fill always looks muddy.
  static const primaryLift = <BoxShadow>[
    BoxShadow(color: Color(0x4D0B57D0), blurRadius: 12, offset: Offset(0, 4)),
  ];
}

const _textTheme = TextTheme(
${TYPE.map(([d, k]) => {
  const size = px(`--${k}-size`);
  const line = px(`--${k}-line`);
  const weight = decls.get(`--${k}-weight`);
  const track = TRACKING[d];
  return `  ${d}: TextStyle(
    fontSize: ${size},
    height: ${(Number(line) / Number(size)).toFixed(4)}, // ${line}px line
    fontWeight: FontWeight.w${weight},${track ? `\n    letterSpacing: ${track},` : ''}
  ),`;
}).join('\n')}
);

ThemeData papaFixTheme() {
  const scheme = ColorScheme.light(
    primary: AppColors.primary,
    onPrimary: AppColors.onPrimary,
    primaryContainer: AppColors.primaryContainer,
    onPrimaryContainer: AppColors.onPrimaryContainer,
    secondary: AppColors.accent,
    onSecondary: AppColors.onAccent,
    secondaryContainer: AppColors.accentContainer,
    onSecondaryContainer: AppColors.onAccentContainer,
    surface: AppColors.surface,
    onSurface: AppColors.onSurface,
    onSurfaceVariant: AppColors.onSurfaceVariant,
    outline: AppColors.outline,
    outlineVariant: AppColors.outlineVariant,
    error: AppColors.error,
    onError: AppColors.onError,
    errorContainer: AppColors.errorContainer,
    onErrorContainer: AppColors.onErrorContainer,
  );

  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: AppColors.surfaceLowest,
    textTheme: _textTheme,
    fontFamily: 'Roboto',
    extensions: const <ThemeExtension<dynamic>>[
      AppSpacing(),
      AppRadii(),
      StatusColors(),
    ],

    // Height 56, fully rounded — the same shape family as the chips and nav.
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        minimumSize: const Size.fromHeight(56),
        shape: const StadiumBorder(),
        textStyle: _textTheme.titleMedium,
        disabledBackgroundColor: AppColors.surfaceContainer,
        disabledForegroundColor: AppColors.onSurfaceVariant,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        minimumSize: const Size.fromHeight(56),
        shape: const StadiumBorder(),
        backgroundColor: AppColors.surface,
        foregroundColor: AppColors.onSurface,
        side: const BorderSide(color: AppColors.outline),
        textStyle: _textTheme.titleMedium,
      ),
    ),

    // Height 58, radius 16, generous inset. See DESIGN-SYSTEM.md §4.
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.surface,
      constraints: const BoxConstraints(minHeight: 58),
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      hintStyle: _textTheme.bodyLarge?.copyWith(
        color: AppColors.onSurfaceVariant.withValues(alpha: 0.6),
      ),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: AppColors.outline),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: AppColors.outline),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: AppColors.primary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: AppColors.error),
      ),
    ),

    cardTheme: CardThemeData(
      color: AppColors.surface,
      elevation: 0,
      margin: EdgeInsets.zero,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: AppColors.outlineVariant),
      ),
    ),

    // The indicator is built in — do not hand-roll it.
    navigationBarTheme: NavigationBarThemeData(
      height: 64,
      backgroundColor: AppColors.surface,
      indicatorColor: AppColors.primaryContainer,
      indicatorShape: const StadiumBorder(),
      labelTextStyle: WidgetStatePropertyAll(_textTheme.labelSmall?.copyWith(
        letterSpacing: 0,
      )),
    ),

    bottomSheetTheme: const BottomSheetThemeData(
      backgroundColor: AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(22)),
      ),
    ),

    dividerTheme: const DividerThemeData(
      color: AppColors.outlineVariant, thickness: 1, space: 1,
    ),
  );
}
`;

emit('papafix_theme.dart', dart);

/* --------------------------------------------------------------- JSON ---- *
 * Stack-neutral. Feed this to a Tailwind config, a Compose theme, a React
 * Native StyleSheet, or a token pipeline — whatever the dev is actually on. */
const group = (prefix) => Object.fromEntries(
  [...decls].filter(([k]) => k.startsWith(prefix))
            .map(([k, v]) => [k.slice(prefix.length), v]),
);

const json = {
  $comment: 'GENERATED from src/styles/tokens.css — do not edit. Regenerate: npm run handoff',
  color: Object.fromEntries(
    [...decls].filter(([, v]) => /^#[0-9a-f]{3,8}$/i.test(v))
              .map(([k, v]) => [k.replace(/^--/, ''), v]),
  ),
  space: group('--space-'),
  radius: group('--radius-'),
  type: Object.fromEntries(TYPE.map(([d, k]) => [d, {
    size: px(`--${k}-size`),
    lineHeight: px(`--${k}-line`),
    weight: Number(decls.get(`--${k}-weight`)),
    letterSpacing: TRACKING[d] ? Number(TRACKING[d]) : 0,
    uppercase: k === 'label-sm',
  }])),
  elevation: group('--elevation-'),
  gradient: group('--gradient-'),
  layout: {
    touchTargetMin: px('--touch-target-min'),
    bottomNavHeight: px('--bottom-nav-height'),
    bottomNavInset: px('--bottom-nav-inset'),
    statusBarHeight: px('--status-bar-height'),
    gestureBarSpace: px('--gesture-bar-space'),
    iconTile: px('--icon-tile'),
    iconTileLg: px('--icon-tile-lg'),
  },
};

emit('papafix-tokens.json', `${JSON.stringify(json, null, 2)}
`);

/* -------------------------------------------------------------- the MD --- */
const md = readFileSync(resolve(root, 'handoff/DESIGN-SYSTEM.md'), 'utf8');
writeFileSync(resolve(root, 'public/handoff/DESIGN-SYSTEM.md'), md, 'utf8');
console.log('handoff/DESIGN-SYSTEM.md (published)');
