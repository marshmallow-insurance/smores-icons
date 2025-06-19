import { Variant } from '../../src/types'

/**
 * Check for hardcoded colors (variant-specific)
 */
export function validateColors(content: string, variant: Variant): string[] {
  // Misc variant allows hardcoded colors
  if (variant === 'misc') {
    return []
  }

  const allowedValues = ['none', 'currentColor', 'transparent']

  const hasHardcodedColor = (value: string): boolean => {
    return !allowedValues.includes(value.trim())
  }

  // Extract colors from direct attributes (fill="..." stroke="..." color="..." etc.)
  const colorAttributes = [
    'fill',
    'stroke',
    'color',
    'stop-color',
    'flood-color',
    'lighting-color',
    'stop-opacity',
    'fill-opacity',
    'stroke-opacity',
  ]

  const attributePattern = new RegExp(
    `(${colorAttributes.join('|')})=["']([^"']+)["']`,
    'gi',
  )

  const directAttributes = Array.from(content.matchAll(attributePattern)).map(
    (match) => match[2],
  )

  // Extract colors from style attributes (style="fill: ...; stroke: ...")
  const styleAttributes = Array.from(
    content.matchAll(/style=["']([^"']+)["']/gi),
  ).map((match) => match[1])

  const styleColors = styleAttributes.flatMap((styleContent) =>
    Array.from(styleContent.matchAll(/(fill|stroke)\s*:\s*([^;]+)/gi)).map(
      (match) => match[2],
    ),
  )

  // Combine all color values and check for hardcoded ones
  const allColors = [...directAttributes, ...styleColors]
  const hasInvalidColors = allColors.some(hasHardcodedColor)

  return hasInvalidColors
    ? ['Contains hardcoded colors - use "currentColor" instead']
    : []
}
