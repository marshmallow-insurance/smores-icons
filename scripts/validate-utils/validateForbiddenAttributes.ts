export const FORBIDDEN_ATTRIBUTES = [
  'id',
  'class',
  'className',
  'style',
  'color',
] as const

export function validateForbiddenAttributes(
  attributes: Record<string, string>,
): string[] {
  return FORBIDDEN_ATTRIBUTES.filter((attr) => attributes[attr]).map(
    (attr) => `Forbidden attribute: ${attr}`,
  )
}
