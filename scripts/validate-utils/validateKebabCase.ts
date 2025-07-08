export function validateKebabCase(filename: string): string[] {
  const errors: string[] = []

  const nameWithoutExt = filename.replace(/\.svg$/, '')
  if (!/^[a-z]+(-[a-z]+)*$/.test(nameWithoutExt)) {
    errors.push('Filename must be in kebab-case (e.g., my-icon.svg)')
  }

  if (!/\.svg$/.test(filename)) {
    errors.push('File must have .svg extension')
  }

  return errors
}
