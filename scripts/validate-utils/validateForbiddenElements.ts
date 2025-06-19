import { Variant } from '../../src/types'

// Forbidden elements
export const FORBIDDEN_ELEMENTS = [
  'text',
  'image',
  'use',
  'filter',
  'gradient',
  'linearGradient',
  'radialGradient',
  'mask',
] as const

/**
 * Check for forbidden elements
 */
export function validateForbiddenElements(
  elements: string[],
  variant: Variant,
): string[] {
  if (variant === 'misc') {
    return []
  }

  const forbiddenFound = elements.filter((el) =>
    FORBIDDEN_ELEMENTS.includes(el as any),
  )

  return forbiddenFound.length > 0
    ? [`Contains forbidden elements: ${forbiddenFound.join(', ')}`]
    : []
}
