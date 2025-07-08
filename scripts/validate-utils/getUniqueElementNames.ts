export function getUniqueElementNames(content: string): string[] {
  // Finds all element names from opening XML/HTML tags in the content
  const elementMatches = Array.from(content.matchAll(/<(\w+)(?:\s|>)/g))
  const elementNames = elementMatches.map((match) => match[1])
  return [...new Set(elementNames)]
}
