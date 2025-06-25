# @mrshmllw/react-icons

React icon components for Marshmallow applications.

## Installation

```bash
npm install @mrshmllw/react-icons
```

## Usage

```tsx
import { CalendarUserSolid, ListOutline, VisaMisc } from '@mrshmllw/react-icons'

function MyComponent() {
  return (
    <div>
      <CalendarUserSolid size={24} color="blue" />
      <VisaMisc size={32} />
    </div>
  )
}
```

## Icon Variants

Icons are available in three variants:

- **Outline** - Line-based icons (suffix: `Outline`)
- **Solid** - Filled icons (suffix: `Solid`)
- **Misc** - Brand and special icons (suffix: `Misc`)

## Props

```typescript
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
  color?: string
  strokeWidth?: number | string

  // Margin props
  m?: SpacingProp
  mx?: SpacingProp | 'auto'
  my?: SpacingProp
  ml?: SpacingProp | 'auto'
  mr?: SpacingProp | 'auto'
  mt?: SpacingProp
  mb?: SpacingProp
}

type SpacingProp =
  | '0'
  | '8px'
  | '12px'
  | '16px'
  | '24px'
  | '32px'
  | '48px'
  | '64px'
  | { custom: number | string }
```

## Import Paths

All icons are available from the main package:

```tsx
import { UserSolid, HouseOutline, StripeMisc } from '@mrshmllw/react-icons'
```

## Styling

Icons use `currentColor` by default:

```tsx
<div style={{ color: 'blue' }}>
  <UserSolid /> {/* Will be blue */}
</div>

<UserSolid color="red" /> {/* Will be red */}
```

## Margin Utilities

Icons include built-in margin utilities:

```tsx
<UserSolid m="16px" />           {/* All margins */}
<UserSolid mx="24px" my="8px" /> {/* Horizontal and vertical */}
<UserSolid ml="auto" mr="16px" /> {/* Individual margins */}
<UserSolid m={{ custom: '1rem' }} /> {/* Custom values */}
```

## Development

```bash
npm install
npm run validate:svg   # Validate SVG files
npm run build:icons    # Generate components from SVGs
npm run build         # Build package
npm test             # Run tests
```

## Icon Viewing

There are two ways to view all available icons:

### Simple Viewer (Recommended)

```bash
npm run simple-viewer
```

This generates a standalone HTML file (`index.html`) that:

- Directly reads SVG files from the `icons/` folders
- Requires **no build step** or React components
- Shows all icons grouped by name with search and filtering
- Works immediately without any dependencies

### Complex Viewer (Legacy)

```bash
npm run icon-viewer
```

This generates an HTML file with embedded data that:

- Requires building React components first (`npm run build:icons`)
- Reads from generated component metadata
- More complex but matches the actual package exports

**Use the simple viewer for quick icon browsing and the complex viewer only if
you need to verify the exact component names and exports.**

## Adding Icons

1. Add SVG to the appropriate variant folder:
   - `icons/outline/my-icon.svg` → `MyIconOutline`
   - `icons/solid/my-icon.svg` → `MyIconSolid`
   - `icons/misc/my-icon.svg` → `MyIconMisc`

2. Follow the [SVG Guidelines](./SVG_GUIDELINES.md)

3. Validate and build:

   ```bash
   npm run validate:svg
   npm run build:icons
   ```

4. Test and commit

## Icon Naming

- Use kebab-case for SVG files: `user-circle.svg`
- Components are auto-generated as PascalCase with variant suffix:
  `UserCircleSolid`
- All icons must be 24x24 with `viewBox="0 0 24 24"`

## License

MIT
