# @mrshmllw/react-icons

React icon components for Marshmallow applications.

## Installation

```bash
npm install @mrshmllw/icons
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

## Import Paths

All icons are available from the main package:

```tsx
import { UserSolid, HouseOutline, StripeMisc } from '@mrshmllw/react-icons'
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

View added icons locally by regenerating the github pages file and opening in
your browser. You can do so by running:

```bash
npm run generate-gh-pages
```

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
