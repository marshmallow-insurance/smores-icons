import fs from 'fs'
import path from 'path'
import { Variant } from '../../src/types'
import { ICONS_DIR } from './constants'

/**
 * Get SVG files from variant folder
 */
export function getSvgFiles(variant: Variant): string[] {
  const folderPath = path.join(ICONS_DIR, variant)

  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder ${variant} not found, skipping...`)
    return []
  }

  const svgFiles = fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.svg'))

  if (svgFiles.length === 0) {
    console.log(`No SVG files found in ${variant} directory`)
    return []
  }

  console.log(`\n📁 Processing ${variant} folder (${svgFiles.length} files)`)
  return svgFiles
}
