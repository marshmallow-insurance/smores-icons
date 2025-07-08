import { Variant } from '../../src/types'

export function validateHardCodedColors(
  content: string,
  variant: Variant,
): string[] {
  if (variant === 'misc') {
    return []
  }

  const allowedValues = ['none', 'currentColor', 'transparent']

  const hasHardcodedColor = (value: string): boolean => {
    return !allowedValues.includes(value.trim())
  }

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

  // Finds all color-related attributes and their values in the SVG content
  const attributePattern = new RegExp(
    `(${colorAttributes.join('|')})=["']([^"']+)["']`,
    'gi',
  )

  const directAttributes = Array.from(content.matchAll(attributePattern)).map(
    (match) => match[2],
  )

  // Extracts the content of style attributes from the SVG
  const styleAttributes = Array.from(
    content.matchAll(/style=["']([^"']+)["']/gi),
  ).map((match) => match[1])

  // Finds fill and stroke color values within CSS style declarations
  const styleColors = styleAttributes.flatMap((styleContent) =>
    Array.from(styleContent.matchAll(/(fill|stroke)\s*:\s*([^;]+)/gi)).map(
      (match) => match[2],
    ),
  )

  const allColors = [...directAttributes, ...styleColors]
  const hasInvalidColors = allColors.some(hasHardcodedColor)

  return hasInvalidColors
    ? ['Contains hardcoded colors - use "currentColor" instead']
    : []
}
