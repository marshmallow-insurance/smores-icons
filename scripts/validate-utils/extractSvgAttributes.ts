export function extractSvgAttributes(content: string): Record<string, string> {
  // Finds and extracts the opening SVG tag from the content
  const svgMatch = content.match(/<svg[^>]*>/s)

  if (!svgMatch) {
    return {}
  }

  // Extracts all attribute name-value pairs from the SVG tag
  const attributeMatches = Array.from(
    svgMatch[0].matchAll(/(\w+(?:-\w+)*)=["']([^"']*)["']/g),
  )

  return Object.fromEntries(
    attributeMatches.map((match) => [match[1], match[2]]),
  )
}
