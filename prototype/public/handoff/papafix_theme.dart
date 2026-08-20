// PapaFix design tokens — GENERATED, do not edit.
// Source: src/styles/tokens.css   Regenerate: npm run handoff
//
// Usage:  MaterialApp(theme: papaFixTheme())
// Read spacing/radii/status colours off the context:
//   final s = Theme.of(context).extension<AppSpacing>()!;
//   Padding(padding: EdgeInsets.all(s.lg), ...)

import 'package:flutter/material.dart';

class AppColors {
  static const primary = Color(0xFFC2410C); // --primary
  static const onPrimary = Color(0xFFFFFFFF); // --on-primary
  static const primaryContainer = Color(0xFFFFEDD5); // --primary-container
  static const onPrimaryContainer = Color(0xFF7C2D12); // --on-primary-container
  static const accent = Color(0xFF0B57D0); // --accent
  static const onAccent = Color(0xFFFFFFFF); // --on-accent
  static const accentContainer = Color(0xFFDCE6FA); // --accent-container
  static const onAccentContainer = Color(0xFF0A2E6B); // --on-accent-container
  static const primaryBright = Color(0xFFE8590C); // --primary-bright
  static const primaryDeep = Color(0xFF7C2D12); // --primary-deep
  static const accentBright = Color(0xFF1565E0); // --accent-bright
  static const accentDeep = Color(0xFF073B8F); // --accent-deep
  static const surface = Color(0xFFFFFFFF); // --surface
  static const surfaceLowest = Color(0xFFF5F6F1); // --surface-container-lowest
  static const surfaceContainer = Color(0xFFEDEEE9); // --surface-container
  static const onSurface = Color(0xFF1A1C19); // --on-surface
  static const onSurfaceVariant = Color(0xFF494C47); // --on-surface-variant
  static const outline = Color(0xFFB9BCB6); // --outline
  static const outlineVariant = Color(0xFFDEE0DA); // --outline-variant
  static const error = Color(0xFFB3261E); // --error
  static const onError = Color(0xFFFFFFFF); // --on-error
  static const errorContainer = Color(0xFFFCEEEE); // --error-container
  static const onErrorContainer = Color(0xFF8C1D18); // --on-error-container
  static const success = Color(0xFF146C43); // --success
  static const successContainer = Color(0xFFDFF3E6); // --success-container
  static const warning = Color(0xFF8A5300); // --warning
  static const warningContainer = Color(0xFFFDF0DC); // --warning-container
  static const neutral = Color(0xFF494C47); // --neutral
  static const neutralContainer = Color(0xFFEDEEE9); // --neutral-container
}

/// 4pt base. The page gutter is [xl].
@immutable
class AppSpacing extends ThemeExtension<AppSpacing> {
  const AppSpacing();
  final double xs = 4;
  final double sm = 8;
  final double md = 12;
  final double lg = 16;
  final double xl = 20;
  final double s2xl = 24;
  final double s3xl = 32;
  final double s4xl = 40;

  @override
  AppSpacing copyWith() => const AppSpacing();
  @override
  AppSpacing lerp(ThemeExtension<AppSpacing>? other, double t) => this;
}

/// Four steps, each with exactly one job. See DESIGN-SYSTEM.md §3.
@immutable
class AppRadii extends ThemeExtension<AppRadii> {
  const AppRadii();
  final double sm = 8;
  final double md = 12;
  final double lg = 16;
  final double xl = 22;
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
  headlineLarge: TextStyle(
    fontSize: 30,
    height: 1.2000, // 36px line
    fontWeight: FontWeight.w700,
    letterSpacing: -0.7,
  ),
  headlineSmall: TextStyle(
    fontSize: 22,
    height: 1.2727, // 28px line
    fontWeight: FontWeight.w700,
    letterSpacing: -0.4,
  ),
  titleLarge: TextStyle(
    fontSize: 18,
    height: 1.3333, // 24px line
    fontWeight: FontWeight.w600,
    letterSpacing: -0.2,
  ),
  titleMedium: TextStyle(
    fontSize: 16,
    height: 1.3750, // 22px line
    fontWeight: FontWeight.w600,
  ),
  bodyLarge: TextStyle(
    fontSize: 16,
    height: 1.5000, // 24px line
    fontWeight: FontWeight.w400,
  ),
  bodyMedium: TextStyle(
    fontSize: 14,
    height: 1.4286, // 20px line
    fontWeight: FontWeight.w400,
  ),
  labelLarge: TextStyle(
    fontSize: 14,
    height: 1.4286, // 20px line
    fontWeight: FontWeight.w600,
  ),
  labelSmall: TextStyle(
    fontSize: 12,
    height: 1.3333, // 16px line
    fontWeight: FontWeight.w600,
    letterSpacing: 0.8,
  ),
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
