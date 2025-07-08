import * as changeCase from 'change-case'
import fs from 'fs'
import path from 'path'
import { Variant } from '../../src/types'
import {
  ProcessedIcon,
  REACT_OUTPUT_DIR,
  VARIANT_SUFFIX_MAP,
} from './constants'

export function generateReactComponent(
  file: string,
  variant: Variant,
): ProcessedIcon {
  const iconFileName = path.basename(file, '.svg')
  const baseName = changeCase.pascalCase(iconFileName)
  const componentName = `${baseName}${VARIANT_SUFFIX_MAP[variant]}`
  const relativeSvgPath = `../../icons/${variant}/${file}`

  const reactComponentContent = `import { IconProps } from '../types'
import { generateMarginStyles } from '../utils/spacing'
import SvgComponent from '${relativeSvgPath}?react'

const ${componentName} = ({ ref, size, rotate, m, mx, my, ml, mr, mt, mb, style, ...props }: IconProps & { ref?: React.Ref<SVGSVGElement> }) => {
  const marginStyles = generateMarginStyles({ m, mx, my, ml, mr, mt, mb })
  
  // Handle rotation transform
  const rotateTransform = rotate ? \`rotate(\${rotate}deg)\` : undefined
  const transform = rotateTransform ? rotateTransform : undefined
  
  const combinedStyles = { 
    ...marginStyles, 
    ...(transform && { transform }), 
    ...style 
  }
  
  return (
    <SvgComponent 
      ref={ref} 
      width={size || '24'} 
      height={size || '24'} 
      style={combinedStyles}
      {...props} 
    />
  )
}

${componentName}.displayName = '${componentName}'

export default ${componentName}
`

  const reactOutputPath = path.join(REACT_OUTPUT_DIR, `${componentName}.tsx`)

  fs.writeFileSync(reactOutputPath, reactComponentContent)
  console.log(`  ✅ Generated ${componentName}`)

  return {
    componentName,
    exportStatement: `export { default as ${componentName} } from './icons/${componentName}'`,
  }
}
