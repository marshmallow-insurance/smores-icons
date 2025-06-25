# SVG Guidelines for @mrshmllw/icons

Quick reference for adding SVG icons to the package.

## 📋 Outline icon structure

```svg
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="..." />
</svg>
```

## 📋 Solid icon structure

```svg
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="..." />
</svg>
```

## ✅ Requirements

- **Size**: 24x24 canvas with `viewBox="0 0 24 24"`
- **Root SVG**: Use `fill="none"`, `stroke="none"`, `stroke-width="0"`
- **Paths**: Use `fill="currentColor"` on path elements
- **Naming**: Use kebab-case: `my-icon.svg` → `<MyIcon />` and name same SVG
  name for variants
- **Elements**: Use `<path>`, `<circle>`, `<rect>`, `<line>` only

## ❌ Don't Use

- `id`, `class`, `style` attributes
- Hardcoded colors (`#000`, `red`, etc.)
- `<text>`, `<image>`, `<use>` elements
- Wrong dimensions or viewBox
- `stroke="currentColor"` or `stroke-width="2"` (use fill instead)

## 🚀 Adding Icons

1. Add SVG to `/icons/my-icon.svg`
2. Run `npm run validate:svg` to check
3. Run `npm run build:icons` to generate React component
4. Test and commit

## Examples

### ✅ Good

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" />
</svg>
```

### ❌ Bad

```svg
<svg width="32" height="32" viewBox="0 0 32 32" fill="#ff0000">
  <text>❤️</text>
</svg>
```

That's it! Follow these rules and your icons will work perfectly.
