/**
 * Extract SVG attributes from the root element
 */
export function extractSvgAttributes(content: string): Record<string, string> {
  const svgMatch = content.match(/<svg[^>]*>/s)

  if (!svgMatch) {
    return {}
  }

  const attributeMatches = Array.from(
    svgMatch[0].matchAll(/(\w+(?:-\w+)*)=["']([^"']*)["']/g),
  )

  return Object.fromEntries(
    attributeMatches.map((match) => [match[1], match[2]]),
  )
}
