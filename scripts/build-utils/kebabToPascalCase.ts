import { validateKebabCase } from '../validate-utils/validateKebabCase'

/**
 * Convert kebab-case filename to PascalCase
 * Validates input is proper kebab-case first
 */
export function kebabToPascalCase(filename: string): string {
  // Ensure the filename is valid kebab-case
  const errors = validateKebabCase(filename)
  if (errors.length > 0) {
    throw new Error(
      `❌  Invalid filename format for "${filename}": ${errors.join(', ')}`,
    )
  }

  // Remove .svg extension and convert to PascalCase
  const nameWithoutExt = filename.replace(/\.svg$/, '')
  return nameWithoutExt
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
