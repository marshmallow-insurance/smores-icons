/**
 * Get all unique element names in SVG
 */
export function getUniqueElementNames(content: string): string[] {
  const elementMatches = Array.from(content.matchAll(/<(\w+)(?:\s|>)/g))
  const elementNames = elementMatches.map((match) => match[1])
  return [...new Set(elementNames)]
}
