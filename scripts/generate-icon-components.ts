import { Variant } from '../src/types'
import { ProcessedIcon, SUPPORTED_VARIANTS } from './build-utils/constants'
import { generateIndexFile } from './build-utils/generateIndexFile'
import { getSvgFiles } from './build-utils/getSvgFiles'
import { processSvgFile } from './build-utils/processSvgFile'
import { setupDirectories } from './build-utils/setupDirectories'

/**
 * Process all SVG files in a variant folder
 */
function processVariantFolder(variant: Variant): ProcessedIcon[] {
  const svgFiles = getSvgFiles(variant)
  return svgFiles.map((file) => processSvgFile(file, variant))
}

/**
 * Main build function
 */
async function buildIcons(): Promise<void> {
  console.log('🎨 Building icon components...\n')

  if (!setupDirectories()) {
    return
  }

  const allProcessedIcons =
    SUPPORTED_VARIANTS.flatMap(processVariantFolder).filter(Boolean)

  if (allProcessedIcons.length === 0) {
    console.log('No SVG files found to process')
    return
  }

  generateIndexFile(allProcessedIcons)

  console.log(`\n✅ Generated ${allProcessedIcons.length} React components!`)
  console.log(`📁 React components: src/icons/`)
}

buildIcons()
