import fs from 'fs'
import { Variant } from '../../src/types'

export function validateFileSize(filePath: string, variant: Variant): string[] {
  const warnings: string[] = []

  const stats = fs.statSync(filePath)
  const maxFileSize = variant === 'misc' ? 20 * 1024 : 10 * 1024 // 20KB for misc, 10KB for others

  if (stats.size > maxFileSize) {
    const sizeKB = Math.round(maxFileSize / 1024)
    warnings.push(`File size is over ${sizeKB}KB - consider optimizing`)
  }

  return warnings
}
