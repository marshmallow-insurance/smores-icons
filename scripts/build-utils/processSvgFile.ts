import fs from 'fs'
import path from 'path'
import { Variant } from '../../src/types'
import {
  ProcessedIcon,
  REACT_OUTPUT_DIR,
  VARIANT_SUFFIX_MAP,
} from './constants'
import { generateReactComponent } from './generateReactComponent'
import { kebabToPascalCase } from './kebabToPascalCase'

/**
 * Process a single SVG file into React component
 */
export function processSvgFile(file: string, variant: Variant): ProcessedIcon {
  const iconFileName = path.basename(file)
  const baseName = kebabToPascalCase(iconFileName)
  const componentName = `${baseName}${VARIANT_SUFFIX_MAP[variant]}`
  const relativeSvgPath = `../../icons/${variant}/${file}`

  // Generate and write React component
  const reactComponentContent = generateReactComponent(
    iconFileName,
    variant,
    relativeSvgPath,
  )
  const reactOutputPath = path.join(REACT_OUTPUT_DIR, `${componentName}.tsx`)

  fs.writeFileSync(reactOutputPath, reactComponentContent)
  console.log(`  ✅ Generated ${componentName}`)

  return {
    componentName,
    exportStatement: `export { default as ${componentName} } from './icons/${componentName}'`,
  }
}
