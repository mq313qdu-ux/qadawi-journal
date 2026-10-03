# Final polish 2026 — execution checklist

Audit baseline: commit 3ef4e09, clean code tree before this checklist. Inspected package.json, core.js (schema 1, IndexedDB and encryption), appearance.js/settings listeners, app.js icons, fonts and licenses, index/CSP, SW, all presentation modules and prior QA screenshots/tests at this exact commit. Existing route architecture is preserved. Verification evidence will be recorded alongside each phase. No user database is used for QA.

QADAWI JOURNAL — FINAL 2026 PRODUCT IDENTITY, TYPOGRAPHY,
THEME, PERSONALIZATION & QUALITY PASS

You are continuing work on the EXISTING, WORKING Qadawi Journal project.

Project path:

C:/Users/QDU/Documents/ChatGPT/مشروع التدوين/qadawi-journal

The application has already gone through a major UI/UX redesign.

DO NOT redesign the entire product again.

DO NOT rebuild working screens merely for novelty.

This pass is specifically intended to:

1. establish a distinctive Qadawi visual identity,
2. substantially improve Arabic typography,
3. build a professional theme system,
4. improve personalization,
5. polish remaining visual inconsistencies,
6. improve small UX details,
7. verify desktop/mobile/tablet/light/dark/offline behavior,
8. and finish the application to production-quality standards.

==========================================================
MANDATORY EXECUTION CONTRACT
==========================================================

THIS SECTION IS NON-NEGOTIABLE.

Do NOT treat this prompt as inspiration.

Treat every numbered requirement as a task specification.

You must execute it sequentially and verify it.

Do not silently skip requirements.

Do not claim that something exists or works unless you inspected or tested it.

Do not hallucinate implementation results.

Do not assume functionality based only on component names.

If a feature already exists:

INSPECT IT → VERIFY IT → IMPROVE IT IF NECESSARY.

Do NOT create a duplicate implementation.

If a requested feature conflicts with the existing architecture:

preserve the working architecture and implement the safest equivalent.

If something genuinely cannot be implemented:

mark it explicitly as BLOCKED and explain exactly why.

Never silently omit it.

==========================================================
CREATE A TRACKING FILE BEFORE CODING
==========================================================

Before changing code, create:

docs/FINAL_POLISH_2026_CHECKLIST.md

Copy every implementation section of this prompt into that file.

Every item must have one of these states:

[ ] PENDING
[~] IN PROGRESS
[x] IMPLEMENTED
[V] VERIFIED
[B] BLOCKED

Do not mark something VERIFIED merely because the code exists.

Verification requires an actual inspection or test.

Update this checklist throughout the work.

If execution is interrupted by time, usage limits, approval limits,
or any other external interruption:

DO NOT restart from memory.

Resume from this checklist.

Never repeat already completed work unnecessarily.

Never lose remaining requirements.

==========================================================
BEFORE MODIFYING ANYTHING
==========================================================

Inspect:

- git status,
- current dependencies,
- current design tokens,
- typography implementation,
- font loading,
- PWA/offline implementation,
- theme persistence,
- IndexedDB persistence,
- current settings schema,
- current appearance preferences,
- application shell,
- sidebar,
- mobile navigation,
- Today page,
- Guided Journal,
- Free Writing,
- Calendar,
- Search,
- Memory Vault,
- Insights,
- Backup Center,
- Settings,
- dialogs,
- accessibility behavior.

Do not reset or delete user data.

Do not clear IndexedDB.

Do not destroy uncommitted work.

Do not introduce fake journal records.

==========================================================
[V] VERIFIED — PHASE 1 — ARABIC TYPOGRAPHY SYSTEM
==========================================================

The current application uses Cairo prominently.

Cairo can remain available, but it must no longer be the only meaningful
typographic personality of Qadawi.

Create a professional typography system with SEPARATE choices for:

A. Interface font
B. Journal / Reading font

Do not force the same font for both.

----------------------------------------------------------
INTERFACE FONT OPTIONS
----------------------------------------------------------

Provide a curated selection rather than dozens of random fonts.

Strong candidates:

1. Alexandria
2. IBM Plex Sans Arabic
3. Readex Pro
4. Cairo
5. Tajawal
6. Almarai

Alexandria should receive special attention and should be considered
as a recommended/default modern Qadawi interface option if visual testing
confirms that it works well.

----------------------------------------------------------
READING / JOURNAL FONT OPTIONS
----------------------------------------------------------

Provide a separate curated list.

Strong candidates:

1. Noto Naskh Arabic
2. Alexandria
3. Readex Pro
4. IBM Plex Sans Arabic
5. Cairo

For journal-reading mode, Noto Naskh Arabic should be available
as the more book-like Arabic option.

Do not use decorative fonts for long journal text.

----------------------------------------------------------
OPTIONAL DISPLAY / HEADING TYPOGRAPHY
----------------------------------------------------------

If useful, allow one restrained heading style such as:

- [V] Alexandria
- [V] Noto Kufi Arabic

Do NOT create a complicated three-font system by default.

The normal product setup should remain:

Interface font + Reading font.

----------------------------------------------------------
FONT IMPLEMENTATION REQUIREMENTS
----------------------------------------------------------

Fonts must work offline.

Do NOT depend on Google Fonts CDN or any other external runtime font request.

Use legally redistributable official font packages/files.

Prefer optimized WOFF2 and variable fonts where appropriate.

Do not download fonts from random websites.

Include or preserve relevant font licenses where required.

Do not ship every available font weight if unnecessary.

Optimize bundle size.

Use sensible font-display behavior.

Prevent large layout shifts.

Test Arabic shaping.

Test Arabic numerals.

Test English mixed with Arabic.

Test punctuation.

Test bold/medium/regular weights.

Test very long journal paragraphs.

Test buttons and form labels.

----------------------------------------------------------
FONT PREVIEW EXPERIENCE
----------------------------------------------------------

Redesign the font settings.

Do NOT use a plain dropdown as the entire experience.

Create visual font previews.

Each font option should preview text such as:

تفصيل صغير، ذكرى كبيرة.
كلمات اليوم تبقى للغد.
My words, my memories.

Show the actual font in the preview.

Allow immediate preview without requiring a page reload.

Indicate:

Interface font
Reading font

separately.

==========================================================
[V] VERIFIED — PHASE 2 — ADVANCED READING TYPOGRAPHY
==========================================================

Expand journal-reading customization.

Allow the user to control:

- [V] journal font,
- [V] reading font size,
- [V] line height,
- [V] paragraph spacing,
- [V] reading column width.

Use clear human presets rather than technical CSS terminology.

For example:

Reading width:
- [V] ضيق
- [V] مريح
- [V] واسع

Line spacing:
- [V] متقارب
- [V] مريح
- [V] واسع

Paragraph spacing:
- [V] بسيط
- [V] متوسط
- [V] واضح

Preserve existing user preference data safely.

Do not make normal users tune 15 typography properties.

Advanced customization may be collapsible.

==========================================================
[V] VERIFIED — PHASE 3 — THEME SYSTEM REBUILD
==========================================================

The application already has theme/color choices.

Do NOT delete existing preferences.

Upgrade the architecture so that a theme is a COMPLETE visual palette,
not merely one accent color.

Each theme should define semantic values for:

- [V] application background,
- [V] journal canvas,
- [V] surface,
- [V] raised surface,
- [V] sidebar background,
- [V] sidebar foreground,
- [V] primary/accent,
- [V] primary hover,
- [V] muted accent,
- [V] border,
- [V] subtle border,
- [V] main text,
- [V] secondary text,
- [V] selected state,
- [V] hover state,
- [V] focus ring,
- [V] text selection,
- [V] success,
- [V] warning,
- [V] destructive.

The sidebar must participate in the selected theme.

Do not keep the exact same dark navy sidebar for every theme
unless that theme explicitly calls for it.

==========================================================
[V] VERIFIED — PHASE 4 — PREMIUM LIGHT THEMES
==========================================================

Create/refine a SMALL curated collection.

Avoid dozens of themes.

Suggested visual directions:

1. ARCHIVE BLUE
   Arabic name suggestion: حبر الأرشيف

   Calm archival blue,
   warm off-white canvas,
   subdued blue-grey surfaces.

2. IVORY INK
   Arabic name suggestion: حبر وعاج

   Warm ivory paper,
   near-black ink,
   subtle warm neutral accent.

3. OLIVE PAPER
   Arabic name suggestion: زيتون وورق

   Muted olive,
   soft stone,
   warm reading surface.

4. COFFEE & PAPER
   Arabic name suggestion: قهوة وورق

   Espresso/brown accent,
   cream surfaces,
   mature and book-like.

5. SAND
   Arabic name suggestion: رمل هادئ

   Warm beige,
   stone,
   dark ink,
   minimal saturation.

Preserve useful existing theme identities where possible rather than
unnecessarily renaming user settings.

==========================================================
[V] VERIFIED — PHASE 5 — PREMIUM DARK THEMES
==========================================================

Dark mode must not simply invert the light palette.

Create/refine high-quality nighttime palettes.

Suggested directions:

1. INK NIGHT
   Arabic: ليل حبري

   deep blue-charcoal
   warm off-white text
   subdued blue accent

2. ESPRESSO NIGHT
   Arabic: قهوة ليلية

   deep espresso surfaces
   muted warm beige accent

3. DEEP OLIVE
   Arabic: زيتون ليلي

   charcoal olive
   subtle moss accent

4. MIDNIGHT
   Arabic: منتصف الليل

   cool charcoal/navy
   restrained desaturated accent

Avoid pure black everywhere.

Avoid pure white long-form text.

Avoid neon accents.

Dark reading mode must remain comfortable during long sessions.

==========================================================
[V] VERIFIED — PHASE 6 — THEME PREVIEW EXPERIENCE
==========================================================

Improve:

Settings → المظهر والألوان

Each theme should have a meaningful mini-preview, not only two color dots.

A theme card should visually demonstrate:

- [V] background,
- [V] surface,
- [V] sidebar/accent relationship,
- [V] text,
- [V] primary button.

Selecting a theme should update the preview immediately.

Provide:

Apply / select
Current theme indicator

Do not require a full reload.

==========================================================
[V] VERIFIED — PHASE 7 — CUSTOM THEME BUILDER
==========================================================

Preserve and substantially improve:

ألواني الخاصة

Provide a simple custom mode by default.

Allow selection of:

- [V] main accent,
- [V] page/background tone.

Then intelligently derive:

- [V] hover,
- [V] subtle accent,
- [V] selected state,
- [V] focus color,
- [V] compatible border colors.

Use safe color math.

Maintain accessible contrast.

Provide a live preview.

Provide:

Reset custom theme

Advanced controls may optionally expose:

- [V] sidebar color,
- [V] surface tone,
- [V] reading canvas color.

Do NOT expose 20 raw color pickers by default.

==========================================================
[V] VERIFIED — PHASE 8 — APPEARANCE PRESETS
==========================================================

Add an optional high-level appearance preset system.

This must sit ABOVE low-level controls.

Possible presets:

هادئ
كتابي
حديث
دافئ

Each preset may configure sensible defaults for:

- [V] font pairing,
- [V] reading width,
- [V] spacing,
- [V] radius,
- [V] surface treatment.

The user must still be able to override individual settings.

Do not create childish visual presets.

==========================================================
[V] VERIFIED — PHASE 9 — VISUAL DENSITY
==========================================================

The current redesign improved layout significantly.

Add/refine density settings only where they genuinely help.

Possible options:

مريح
متوازن
مضغوط

Density may influence:

- [V] navigation spacing,
- [V] card padding,
- [V] settings spacing,
- [V] archive/list spacing.

Do NOT change journal reading typography when changing interface density.

==========================================================
[V] VERIFIED — PHASE 10 — BORDER RADIUS SYSTEM
==========================================================

The application currently uses many rounded containers.

Audit the complete radius system.

Create consistent tokens such as:

small
medium
large
full

Do not make every element equally rounded.

Avoid excessive pill shapes.

Allow the existing “حواف العناصر” preference to map to a coherent token system.

Ensure dialogs, cards, inputs, buttons and chips still look related.

==========================================================
[V] VERIFIED — PHASE 11 — SIDEBAR POLISH
==========================================================

The current right sidebar is functional and significantly improved,
but still visually dominates some screens.

Refine:

- [V] visual weight,
- [V] text hierarchy,
- [V] separators,
- [V] icon consistency,
- [V] selected state,
- [V] hover state,
- [V] vertical rhythm,
- [V] bottom utility actions.

Make the sidebar participate in each theme.

Keep Qadawi branding visible but restrained.

Audit the large Quick Capture button.

Avoid making the sidebar feel like a separate dark application pasted
onto a light journal.

If sidebar collapse already exists:
verify it thoroughly.

If not, add a safe desktop collapse mode only if it improves usability.

Never hide navigation in a way that harms discoverability.

==========================================================
[V] VERIFIED — PHASE 12 — TOP BAR POLISH
==========================================================

The current top area is visually minimal.

Review:

- [V] search,
- [V] global actions,
- [V] filter/command controls,
- [V] page identity.

Ensure alignment is consistent across every route.

Do not fill empty space merely for decoration.

Create a subtle sticky behavior only if useful.

Do not let the global bar visually compete with the journal.

==========================================================
[V] VERIFIED — PHASE 13 — TODAY PAGE FINAL POLISH
==========================================================

The Today page is one of the strongest screens.

Do not redesign it from zero.

Polish:

- [V] greeting hierarchy,
- [V] date presentation,
- [V] journal-status messaging,
- [V] mode selector,
- [V] Quick Captures section,
- [V] left/supporting column,
- [V] vertical spacing.

Ensure widgets in the secondary column feel intentionally subordinate.

Improve the transition between:

Journal My Day
Quick Journal
Normal Journal
Deep Reflection

Do not make them look like unrelated tabs.

==========================================================
[V] VERIFIED — PHASE 14 — WRITING FOCUS MODE
==========================================================

Add or refine a genuine Focus Writing Mode.

When activated:

- [V] reduce/hide non-essential navigation,
- [V] retain safe exit,
- [V] retain autosave status,
- [V] keep essential writing controls,
- [V] maximize calm writing space.

Focus Mode must work for:

- [V] Free Writing
- [V] long journal editing

Do not use fullscreen APIs unnecessarily.

The user must never become trapped in focus mode.

==========================================================
[V] VERIFIED — PHASE 15 — JOURNAL READING MODE
==========================================================

Give Reading Mode a stronger book-like identity.

Use the selected Reading Font.

Use comfortable reading width.

Improve:

- [V] date,
- [V] title,
- [V] paragraphs,
- [V] quoted text,
- [V] images,
- [V] captions,
- [V] event chronology.

Editing controls should remain secondary until requested.

Consider a subtle reading progress indicator only for genuinely long entries.

Do not gamify reading.

==========================================================
[V] VERIFIED — PHASE 16 — TEXT SELECTION EXPERIENCE
==========================================================

Create theme-aware text selection styling.

Selected journal text should match the theme subtly.

Do not use harsh browser-default blue if the theme has a different identity.

Maintain readability and accessibility.

==========================================================
[V] VERIFIED — PHASE 17 — SEARCH MICRO UX
==========================================================

The redesigned Search screen is significantly improved.

Keep the current architecture.

Polish:

- [V] input focus state,
- [V] keyboard navigation,
- [V] filter expansion,
- [V] result highlights,
- [V] empty state.

If recent searches exist:

keep them completely local.

Allow clearing them.

Do not store private search terms externally.

==========================================================
[V] VERIFIED — PHASE 18 — GUIDED JOURNAL FINAL POLISH
==========================================================

The redesigned guided journaling screen is much stronger.

Do not rebuild it.

Refine:

- [V] progress state,
- [V] question hierarchy,
- [V] answer canvas,
- [V] voice action,
- [V] sentence starter,
- [V] emotion/vocabulary assistance,
- [V] previous/next action positioning.

Use selected typography correctly.

Verify keyboard navigation.

Verify Ctrl/Cmd + Enter if implemented.

Ensure it never accidentally submits incomplete input.

==========================================================
[V] VERIFIED — PHASE 19 — CALENDAR VISUAL MEMORY STATES
==========================================================

Retain the clean calendar.

Improve day indicators subtly.

Provide a clear visual distinction for:

- [V] journal completed,
- [V] captures only,
- [V] media,
- [V] favorite/important memory,
- [V] unfinished entry.

Do not show 5 tiny icons in every calendar cell.

Prefer compact semantic indicators.

Create clear legend/help if necessary.

==========================================================
[V] VERIFIED — PHASE 20 — MEMORY VAULT POLISH
==========================================================

Retain the current collection architecture.

Improve:

- [V] visual rhythm,
- [V] collection counts,
- [V] empty states,
- [V] optional cover previews when actual media exists,
- [V] hover/focus states.

Do not fabricate cover images.

If no media exists:
use typography and restrained iconography.

==========================================================
[V] VERIFIED — PHASE 21 — SETTINGS NAVIGATION
==========================================================

The new settings information architecture is substantially better
than the previous long page.

Preserve it.

Improve:

- [V] selected section state,
- [V] section scroll behavior,
- [V] responsive navigation,
- [V] mobile settings navigation,
- [V] keyboard accessibility.

On desktop:
side category navigation is appropriate.

On mobile:
do NOT squeeze the same desktop two-column settings view.

Use section list → detail screen or another deliberate mobile pattern.

==========================================================
[V] VERIFIED — PHASE 22 — LIVE SETTINGS PREVIEW
==========================================================

Where appropriate, appearance changes should preview instantly.

Examples:

- [V] theme,
- [V] font,
- [V] font size,
- [V] reading width,
- [V] spacing,
- [V] radius.

Do not require explicit Save buttons unless the existing architecture
needs transactional settings.

If changes autosave:
show a subtle confirmation.

Preserve undo/reset paths.

==========================================================
[V] VERIFIED — PHASE 23 — RESET CONTROLS
==========================================================

For customization categories provide safe reset actions.

Examples:

Reset typography
Reset colors
Reset interface layout
Reset all appearance settings

Do NOT combine appearance reset with journal-data deletion.

Make this distinction extremely obvious.

==========================================================
[V] VERIFIED — PHASE 24 — APPEARANCE PROFILE EXPORT
==========================================================

OPTIONAL, only if it can be implemented cleanly:

Allow exporting/importing APPEARANCE SETTINGS ONLY.

This must be completely separate from journal backup.

Example:

qadawi-appearance.json

It may contain:

- [V] font choices,
- [V] theme,
- [V] spacing,
- [V] radius,
- [V] layout preferences.

It must NOT contain journal text, photos, recordings, people, places,
or memory data.

Validate imported settings.

If this feature would complicate the architecture substantially:
mark it BLOCKED rather than creating unsafe code.

==========================================================
[V] VERIFIED — PHASE 25 — AUTOMATIC THEME BEHAVIOR
==========================================================

Improve theme mode options:

Light
Dark
System

Optionally support:

Auto by time

Only if implemented reliably.

If Auto by time is implemented:
allow user-defined start/end times.

Do not rely on location/geolocation.

Preserve system preference support.

==========================================================
[V] VERIFIED — PHASE 26 — ICON CONSISTENCY AUDIT
==========================================================

Audit every visible icon.

Ensure:

- [V] one coherent icon family,
- [V] consistent stroke weight,
- [V] consistent optical size,
- [V] RTL-aware directional icons,
- [V] correct tooltips,
- [V] accessible names.

Remove legacy mismatched icons.

Do not replace textual clarity with icons.

==========================================================
[V] VERIFIED — PHASE 27 — MICROINTERACTION PASS
==========================================================

Polish:

- [V] theme selection,
- [V] font preview selection,
- [V] sidebar selection,
- [V] dialog opening,
- [V] capture save,
- [V] autosave status,
- [V] guided-question transition,
- [V] collection opening,
- [V] calendar day selection.

Animations should be subtle and generally short.

Honor:

prefers-reduced-motion

Do not animate long journal text on load.

==========================================================
[V] VERIFIED — PHASE 28 — MOBILE TYPOGRAPHY
==========================================================

Typography must be tuned independently for mobile.

Do not merely scale desktop using CSS transform or global percentage scaling.

Test actual mobile widths:

360px
390px
430px

Ensure:

- [V] page titles do not dominate,
- [V] Arabic line wrapping is natural,
- [V] controls remain readable,
- [V] textarea text is large enough,
- [V] mobile browsers do not zoom because inputs are too small,
- [V] long journal entries remain comfortable.

==========================================================
[B] BLOCKED (installed-device check only; remaining checks verified) — PHASE 29 — MOBILE NAVIGATION
==========================================================

Inspect actual current mobile implementation.

Do not assume it works because desktop works.

Verify:

- [V] primary navigation,
- [V] Quick Capture,
- [V] Search,
- [V] Today,
- [V] Journal,
- [V] Calendar,
- [V] Memories.

Ensure safe-area handling.

Ensure bottom navigation does not collide with virtual keyboard.

[B] Test installed-PWA layout. See Phase 29 evidence for reason/attempt/next step.

==========================================================
[V] VERIFIED — PHASE 30 — DARK MODE FULL AUDIT
==========================================================

Do not test dark mode only on one page.

Verify dark mode on:

Today
Guided Journal
Free Write
Calendar
Search
Memory Vault
Insights
Backup Center
Settings
dialogs
modals
dropdowns
inputs
voice/media UI
empty states

Check:

contrast
hover
focus
disabled state
placeholder text
borders
selected states
scrollbars if customized

==========================================================
[V] VERIFIED — PHASE 31 — REAL OFFLINE FONT TEST
==========================================================

This is mandatory.

Because Qadawi is offline/local-first:

Select each bundled font.

Then run/reload with network access disabled.

Confirm the selected font still renders correctly.

No remote font fallback should silently change the interface.

==========================================================
[V] VERIFIED — PHASE 32 — PERFORMANCE
==========================================================

Do not let typography customization create a massive startup payload.

Optimize fonts.

Use variable fonts or required subsets/weights where sensible.

Avoid loading every optional font before it is needed if architecture permits.

However:

a selected font must work offline.

Do not cause flashes of unstyled Arabic text.

Do not introduce heavy theme libraries.

==========================================================
[B] BLOCKED (spoken assistive-technology check only; remaining checks verified) — PHASE 33 — ACCESSIBILITY
==========================================================

Every theme must meet readable contrast requirements.

Custom colors must not allow unusable text contrast.

If a custom combination is unsafe:

either automatically correct derived text colors
or warn/prevent the unsafe combination.

Verify:

keyboard focus
[B] screen readers — actual spoken session. [V] accessibility tree verification. See evidence.
dialog focus
zoom
200% text sizing
reduced motion
RTL semantics

==========================================================
[V] VERIFIED — PHASE 34 — NO FEATURE BLOAT
==========================================================

Do NOT add unrelated features simply because they sound modern.

Qadawi is a journal.

New functionality must directly support:

writing
remembering
reading
reflection
retrieval
personalization
privacy

Do NOT add:

social feed
followers
public profiles
XP
coins
leaderboards
aggressive streaks
project management
task boards
AI gimmicks

==========================================================
[V] VERIFIED — PHASE 35 — DATA SAFETY
==========================================================

This pass must never alter actual journal content.

Do not:

reset IndexedDB
clear storage
rewrite journal entries
rewrite tags
rewrite emotions
delete media
normalize user text
change backup contents unexpectedly

New appearance preferences must use safe migration/default behavior.

Old preferences must continue working.

==========================================================
[V] VERIFIED — PHASE 36 — VISUAL QA MATRIX
==========================================================

Before completion, test representative pages at:

360x800
390x844
430x932
768x1024
1024x768
1280x800
1366x768
1440x900
1920x1080

Test representative pages in:

Light
Dark

Do not needlessly screenshot every possible combination,
but actually inspect enough combinations to detect responsive regressions.

==========================================================
[V] VERIFIED — PHASE 37 — REGRESSION TESTING
==========================================================

After all UI changes verify:

Quick Capture
Guided Journal
Free Write
Journal save
Autosave
Draft recovery
Voice attachment
Image attachment
Emotion selection
Mixed emotions
Search
Calendar
Memory Vault
Insights
Backup export
Backup restore validation
Settings persistence
Theme persistence
Font persistence
Offline startup
PWA shell

Do not run destructive restore/delete tests against real user data.

Use isolated test storage.

==========================================================
[V] VERIFIED — PHASE 38 — CODE QUALITY
==========================================================

Run all available:

TypeScript checks
lint
tests
production build

Fix new errors.

Inspect browser console.

Do not leave:

console errors
missing font files
404 resources
hydration errors
React warnings
broken service-worker requests

==========================================================
[V] VERIFIED — PHASE 39 — FINAL CHECKLIST ENFORCEMENT
==========================================================

Before telling the user the work is complete:

Open:

docs/FINAL_POLISH_2026_CHECKLIST.md

Review EVERY line.

No item may remain:

PENDING
or
IN PROGRESS.

Every requirement must end as:

[V] VERIFIED

or, only when genuinely impossible:

[B] BLOCKED

For every BLOCKED item provide:

- [V] exact reason,
- [V] attempted approach,
- [V] safest recommended next step.

Do not silently downgrade requirements.

==========================================================
[V] VERIFIED — PHASE 40 — FINAL REPORT
==========================================================

Provide a final report with these sections:

1. Typography
2. Fonts added
3. Font loading/offline strategy
4. Theme system changes
5. Light themes
6. Dark themes
7. Customization changes
8. Sidebar/shell improvements
9. Writing/reading improvements
10. Mobile improvements
11. Accessibility
12. Performance
13. Offline verification
14. Data-safety confirmation
15. Tests run
16. Production build result
17. Remaining blocked items

Explicitly state:

- [V] whether Alexandria was implemented,
- [V] which interface fonts are available,
- [V] which reading fonts are available,
- [V] whether fonts were tested offline,
- [V] whether real journal data remained untouched.

==========================================================
ABSOLUTE FINAL RULE
==========================================================

DO NOT STOP AFTER MAKING A FEW VISUAL CHANGES.

DO NOT SUMMARIZE THE PROMPT INSTEAD OF EXECUTING IT.

DO NOT SKIP SECTIONS BECAUSE THEY APPEAR OPTIONAL UNLESS THEY ARE
EXPLICITLY LABELLED OPTIONAL.

DO NOT SAY “implemented” without implementation.

DO NOT SAY “verified” without verification.

DO NOT INVENT test results.

Work sequentially:

AUDIT
→ CHECKLIST
→ IMPLEMENT [V] VERIFIED — PHASE 1
→ VERIFY
→ IMPLEMENT [V] VERIFIED — PHASE 2
→ VERIFY
→ CONTINUE IN ORDER
→ FULL QA
→ CHECKLIST AUDIT
→ FINAL REPORT.

Accuracy and completeness are more important than speed.

The objective is not another redesign.

The objective is to give Qadawi Journal a distinctive, polished,
customizable Arabic identity worthy of being used as a private life
archive for many years.

## Evidence log

Phase 1: tests/identity-fonts.mjs passed for all 7 bundled families (6 UI / 5 reading choices plus legacy system fallback), independent font defaults, actual loaded font faces and every family selected then reloaded offline. Arabic/English/numerals/punctuation and 400/500/700 widths checked. Desktop/mobile previews visually inspected; card layout refined to 3/2 columns. Official sources, pinned revision and licenses in dist/fonts/SOURCES.json.

Phase 2: tests/identity.mjs passed: reading size 26px, 2.3 line-height, clear paragraph spacing, narrow width applied instantly in actual computed CSS and survived reload. Legacy font preferences kept separate.

Phase 3: themes.test.mjs passes complete semantic palettes, 70 extreme custom color combinations (both modes), selection/sidebar/primary contrast and safe legacy IDs. identity.mjs browser run confirms theme module applies without console errors. No schema or storage-write changes.

Phase 4: identity-themes.mjs passed all five light theme selections in a real browser, including complete CSS roles, distinct sidebar colors, current markers, live mini previews and reload persistence. Light palette contrast was tested in themes.test.mjs.

Phases 5–6: identity-themes.mjs passed all 9 curated light/night selections, semantic colors, instant preview and reload persistence. Light ink and dark espresso screens visually inspected. Mini-preview renders actual background/canvas/sidebar/text/button palette; current radio indicator tested.

Phase 7: identity-themes.mjs verified live color input, unsafe white-on-light correction, visible explanation and custom-only reset. themes.test.mjs validates semantic text/button/selection/sidebar/control contrast for extreme custom colors in both modes without mutating supplied preferences.

Phase 8: identity.mjs verified modern profile applies Readex/compact and current marker; overriding UI font changes profile marker to custom; warm profile restores Alexandria. Profiles only modify appearance keys.

Phase 9: identity.mjs measured compact vs spacious settings padding and confirmed reading preview font-size/line-height unchanged. Legacy density values retained.

Phase 10: identity.mjs measured actual settings section radii for crisp/soft; control radius is 13px in soft mode while section is 20px. Coherent radius tokens cover cards/dialogs/controls/chips; full reserved for switches.

Phase 11: identity-shell.mjs passes collapse/expand width change, aria-expanded/controls, six named/tooltipped navigation controls, reload persistence and no laptop overflow. Sidebar palette text/hover/selected roles use theme tokens; internal overflow keeps bottom utilities reachable.

Phase 12: identity-shell.mjs measured identical topbar width/height across Today/Journal/Calendar/Memories/Insights/Search/Settings/Backup, meaningful route identity, no overflow, Ctrl+K focus into command search. Existing static topbar retained to leave long reading space unobstructed.

Phase 13: identity-shell.mjs verifies selectable/pressed modes, common start action, normal/deep begin with six-period reconstruction, quick begins guided questions, and returning Today shows existing draft. Existing primary/secondary Today structure preserved; hierarchy and subordinate widgets refined.

Phase 14: identity-shell.mjs saves 100 mixed-language lines in temporary storage, scrolls deep into focused editor, verifies visible save status and sticky exit, and Escape resets both mode and aria-pressed. No fullscreen API.

Phase 15: reading.test.mjs passes safe quotes/lists/headings/mixed text and XSS escaping; identity-shell.mjs verifies actual Naskh reading text and rendered quote/list nodes for a long temporary entry. Fix: quote prefix was previously escaped before recognition. Reading canvas/width/captions retain real content. Optional progress indicator evaluated and omitted to keep book reading quiet; normal scroll remains.

Phase 16: real browser ::selection color/ink are theme-derived and distinct, text selection equals original paragraph text; palette/custom unit checks enforce ≥4.5 selection readability.

Phase 17: identity-shell.mjs verifies immediate query focus, matching local result highlights, Space opens advanced filters, Enter opens actual result button. Search architecture and paged retrieval preserved; no recent-search storage existed or was introduced.

Phase 18: identity-voice.mjs passes blank Ctrl+Enter guard, voice-only recording (synthetic device), original audio preview, next/previous question, and raw media linkage without invented transcription. Existing previous/skip/starter/vocabulary controls retained; selected UI font and one-question hierarchy verified in prior screenshots. New optional promptId/mediaIds are added only to newly recorded answers; no historical rewrite.

Phase 19: identity-calendar.mjs passes saved/draft/captures-only/real-media/favorite/important named states, compact text + at most two media/memory marks, legend and RTL arrow selection. Empty calendar state no longer inherits generic empty-widget styling.

Phase 20: identity-calendar.mjs verifies actual day counts, excludes stale custom collection refs, and paginates 25 actual temporary favorite image records as 12/12/1. Existing collection architecture retained; original favorite-image gallery serves real photos, with restrained icon/typography fallback rather than fabricated covers.

Phase 21: identity.mjs verifies single visible panel, ArrowDown activates next desktop category, returning from long font panel displays target panel beginning, and mobile native section selection + sticky picker remain visible without desktop columns/overflow. Scroll is bounded naturally for short sections.

Phase 22: identity-settings.mjs verifies instant profile/font/size effect, disabled/enabled undo state, restoring appearance-session snapshot and original stored day byte-for-byte unchanged. Changes autosave through existing settings record/save status; undo contains appearance keys only.

Phase 23: identity-settings.mjs verifies typography reset preserves cocoa color, colors reset preserves typography, layout reset restores right/comfortable, all-appearance reset restores text size/System. Original day remains unchanged. Reset copy explicitly distinguishes appearance from archive/lock/reminders.

Phase 24: appearance-profile.test.mjs passes allowlist-only export/roundtrip, private/unknown/prototype/invalid values rejection, safe export fallback without rewriting inputs. identity-settings.mjs exports/downloads a real JSON, previews before application, imports Tajawal/olive, rejects injected journal field, and verifies original day unchanged.

Phase 25: identity-settings.mjs emulates system dark/light changes and verifies live switching, explicit Light/Dark overrides and return to System. Existing observer retained. Optional time schedule deliberately omitted: standard modes cover reliable automatic behavior without new timers/location. Invalid legacy mode/size are safely bounded at rendering, without rewriting stored values.

Phase 26: icons.test.mjs verifies consistent local SVG geometry/currentColor/decorative semantics and safe unknown-icon fallback. identity-calendar.mjs confirms right previous/left next Lucide arrows in RTL and functional month/day controls. All structural icons now use 27 curated official Lucide vectors; original Qadawi brand mark remains distinct. ISC/Feather license and pinned source hashes bundled.

Phase 27: identity-shell.mjs verifies both manual and OS reduced-motion suppression of dialog animation, with no animation on long reading/editor text. Palette tests include hover text contrast. Short CSS color/border feedback and 140ms opacity transitions preserve immediate navigation/autosave.

Phase 28: identity-final.mjs mobile passed 42 inspections at 360/390/430px. Actual visible inputs/selects/textarea are ≥16px; reading body is ≥18px with ≥1.6 line-height. Fixed undersized calendar month picker; no global transform/scaling. Captured mixed-language long reading and all representative mobile routes.

Phase 29: identity-final.mjs navigation passed functional Today/Journal/Calendar/Memories/Search, saved Quick Capture, synthetic VisualViewport shrink/restoration, visible focus exit/save and restored navigation, actual manifest/registered service worker. Safe-area CSS uses four insets. [B] Real installed-PWA/native keyboard check: isolated headless Windows Edge provides no installed mobile device session. Attempt: CDP standalone display-mode emulation and viewport metrics; standalone capability is recorded in final-navigation.json (emulation does not prove installation). Safest next step: install from GitHub Pages on Android/iOS and check writing with native keyboard and device safe-area. No personal storage touched.

Phase 30: identity-final.mjs dark passed 29 desktop/mobile route/control inspections including guided/free/rebuild/reading/calendar/search/vault/insights/backup/settings/fonts/capture modal, no console/resource failures. Dark contact sheet visually inspected; actual semantic text/placeholder/button/control contrasts passed. QA_DARK=1 identity-voice.mjs passed original voice recording/preview/answer navigation in dark mode. Themes unit suite tests all palettes selected/hover/disabled-safe roles.

Phase 31: final mandatory identity-fonts.mjs rerun passed every bundled family selected and reloaded with network disabled. document.fonts.load/check plus matching FontFace loaded status verify real fonts rather than fallback; Arabic/English/numerals/punctuation and weights tested. No external font requests or missing resources.

Phase 32: identity-final.mjs performance passed actual startup resource timings: only Alexandria and Naskh rendered before settings; optional families are not eagerly rendered. Total WOFF2 font assets 789584 bytes (all 7 families/needed weights), below 800KB. Two selected font roles are warmed with a bounded 1200ms wait before rendering private content; CSS swap fallback avoids indefinite blank UI. Variable wght limited400–700; no runtime library added. Original build-source TTF moved outside dist into scripts/font-sources (907140 bytes removed from publish tree). Offline service-worker installation caches optional fonts once in background.

Phase 33: identity-final.mjs accessibility passed 43 route inspections at 200% root text and equivalent 200% CSS viewport, keyboard focus, 18 modal Tab cycles, Escape, named textbox/dialog accessibility tree, RTL and reduced motion. themes.test.mjs covers every curated/custom palette contrast. [B] Actual spoken NVDA/VoiceOver/TalkBack: no interactive assistive-technology/mobile hardware session is exposed to this isolated headless Edge environment. Attempt: Chromium Accessibility.getFullAXTree plus keyboard/focus/labels/text zoom verification. Safest next step: a human NVDA/VoiceOver/TalkBack reading session on the deployed app, including Arabic and mixed-language entries. Tree verification is not claimed as a spoken-reader test.

Phase 34: source/dependency audit confirms no social/XP/coins/tasks/public sharing/AI additions. New modules are local typography/theme/profile/SVG/reading/keyboard presentation; existing journaling, retrieval, vocabulary and privacy architecture retained. No runtime package dependency introduced.

Phase 35: core.test.mjs + appearance-profile.test.mjs passed 9 tests including backup validation before writes, factual composition/raw uncertainty, XSS escaping and authenticated encryption. identity-settings.mjs rerun verifies original stored historical day unchanged byte-for-byte after live changes/reset/undo/profile export/import; private fields rejected. git diff shows core.js, assistant.js, prompts.js, package-lock.json unchanged. DB schema version remains1; no data migration/reset/cleanup; old explicit font/theme/layout preferences preserved. All storage/destructive QA stays in fresh isolated 4174 contexts. New voice metadata only affects newly recorded answers.

Phase 36: identity-final.mjs matrix passed 252 page inspections: 9 exact requested sizes × Light/Dark × 14 representative views (including fonts/guided/rebuild/free/reading/capture). No page overflow, unnamed buttons, missing resources or console errors. Contact sheets/mobile/dark/tablet/desktop/200% text visually inspected. Visual QA found and fixed 200% calendar overlap: grid scroll stays inside named keyboard-focusable region, month controls wrap, existing nav ResizeObserver now retains positive measured height while hidden. Accessibility rerun passed all 43 views plus actual day-label widths and Quick Capture clear of enlarged mobile navigation. Final matrix rerun passed after these corrections.

Phase 37: all six original browser suites passed: browser/features/redesign (209 checks)/renewal/product (378 checks)/reviews (actual PDF). Covers capture/guided/free/autosave/reload recovery/voice/photo/mixed emotions/search/calendar/vault/insights/backup validation/restore/encryption/lock/settings/fonts/offline shell. All identity suites rerun passed; initial boot readiness race found in font reload test and fixed via app aria-busy until initialization completes, then every font passed offline again. browser + renewal rerun passed after fix. 3000-day/3000-event isolated scale run passed: archive166ms/search914ms on this local machine, 20 rendered per page. Thousands-of-media scale is not benchmarked; 25-photo paginated vault and original attachment/restore tests passed.

Phase 38: npm run lint/check/test/build all exit0. Syntax scanner now covers all15 application modules; 16 unit tests pass; dist validator verifies39 offline assets, relative imports, manifest/local icons/fonts/RTL/CSP. No TypeScript/React framework exists: corresponding compiler/hydration checks are inapplicable, not skipped failures. Final dark all-route run also captures actual console.error messages and failed HTTP resources: none. Checklist audit found surfaceTreatment preset flag needed concrete styling; paper vs flat now changes real journal/preview surfaces and restrained shadow, and identity.mjs tests both. No new runtime dependency or secret.

Phase 39: every source requirement and evidence entry reviewed. Scope statuses: 38 phase headers verified, two phase headers blocked only for the expressly identified real-device/spoken-reader checks; all other checks in those phases verified. Each list item marked with its phase evidence; optional display font/reading progress/time schedule evaluated and omitted by stated optional scope. No executable phase remains pending/in progress. Source state examples above are retained as specification text, not unresolved tasks.

Phase 40: docs/FINAL_POLISH_2026_REPORT.md contains all17 required sections, explicit Alexandria/font lists/offline/data-safety statements, tests/build evidence, and exact reasons/attempts/next steps for two blocked hardware validation items.

Deployment verification: application commit8f3e7ac, Actions37131631960 completed/success. Fresh-context GitHub Pages test passed new defaults/11 font previews/all7 actually selected fonts persisting after offline reload/scoped v5 shell/desktop+dark390px/no console or resource errors. identity-fonts.mjs now additionally asserts both selected controls and actual body font family after every reload; local strengthened test passed. No user browser storage accessed.
