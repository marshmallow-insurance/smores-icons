export function validateKebabCase(filename: string): string[] {
  const errors: string[] = []

  const nameWithoutExt = filename.replace(/\.svg$/, '')
  // Validates that filename uses kebab-case format (lowercase letters separated by hyphens)
  if (!/^[a-z]+(-[a-z]+)*$/.test(nameWithoutExt)) {
    errors.push('Filename must be in kebab-case (e.g., my-icon.svg)')
  }

  // Ensures the file has a .svg extension
  if (!/\.svg$/.test(filename)) {
    errors.push('File must have .svg extension')
  }

  return errors
}
