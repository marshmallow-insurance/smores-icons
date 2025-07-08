import { Variant } from '../../src/types'

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

export function validateForbiddenElements(
  elements: string[],
  variant: Variant,
): string[] {
  if (variant === 'misc') {
    return []
  }

  const forbiddenFound = elements.filter((el) =>
    FORBIDDEN_ELEMENTS.includes(el as (typeof FORBIDDEN_ELEMENTS)[number]),
  )

  return forbiddenFound.length > 0
    ? [`Contains forbidden elements: ${forbiddenFound.join(', ')}`]
    : []
}
