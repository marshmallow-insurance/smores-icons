import { Variant } from '../../src/types'

export const REQUIRED_ATTRIBUTES = {
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
} as const

export function validateRequiredAttributes(
  attributes: Record<string, string>,
  variant: Variant,
): string[] {
  if (variant === 'misc') {
    return []
  }

  return Object.entries(REQUIRED_ATTRIBUTES)
    .filter(([attr, expectedValue]) => attributes[attr] !== expectedValue)
    .map(
      ([attr, expectedValue]) =>
        `Missing or incorrect ${attr}="${expectedValue}"`,
    )
}
