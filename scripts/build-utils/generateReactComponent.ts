import { Variant } from '../../src/types'
import { VARIANT_SUFFIX_MAP } from './constants'
import { kebabToPascalCase } from './kebabToPascalCase'

/**
 * Generate React component content
 */
export function generateReactComponent(
  iconName: string,
  variant: Variant,
  relativeSvgPath: string,
): string {
  const baseName = kebabToPascalCase(iconName)
  const componentName = `${baseName}${VARIANT_SUFFIX_MAP[variant]}`

  return `import { IconProps } from '../types'
import { generateMarginStyles } from '../utils/spacing'
import SvgComponent from '${relativeSvgPath}?react'

const ${componentName} = ({ ref, size, m, mx, my, ml, mr, mt, mb, style, ...props }: IconProps & { ref?: React.Ref<SVGSVGElement> }) => {
  const marginStyles = generateMarginStyles({ m, mx, my, ml, mr, mt, mb })
  const combinedStyles = { ...marginStyles, ...style }
  
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
}
