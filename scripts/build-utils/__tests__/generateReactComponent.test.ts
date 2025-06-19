import { describe, expect, it } from 'vitest'
import { generateReactComponent } from '../generateReactComponent'

describe('generateReactComponent', () => {
  describe('component generation', () => {
    const componentTestCases = [
      {
        name: 'outline variant',
        iconName: 'my-icon.svg',
        variant: 'outline' as const,
        relativeSvgPath: '../../icons/outline/my-icon.svg',
        expectedComponentName: 'MyIconOutline',
      },
      {
        name: 'solid variant',
        iconName: 'user-circle.svg',
        variant: 'solid' as const,
        relativeSvgPath: '../../icons/solid/user-circle.svg',
        expectedComponentName: 'UserCircleSolid',
      },
      {
        name: 'misc variant',
        iconName: 'custom-logo.svg',
        variant: 'misc' as const,
        relativeSvgPath: '../../icons/misc/custom-logo.svg',
        expectedComponentName: 'CustomLogoMisc',
      },
      {
        name: 'single word icon',
        iconName: 'icon.svg',
        variant: 'outline' as const,
        relativeSvgPath: '../../icons/outline/icon.svg',
        expectedComponentName: 'IconOutline',
      },
    ]

    it.each(componentTestCases)(
      'should generate component for $name',
      ({ iconName, variant, relativeSvgPath, expectedComponentName }) => {
        const result = generateReactComponent(
          iconName,
          variant,
          relativeSvgPath,
        )

        // Check that component name is used correctly
        expect(result).toContain(`const ${expectedComponentName} =`)
        expect(result).toContain(
          `${expectedComponentName}.displayName = '${expectedComponentName}'`,
        )
        expect(result).toContain(`export default ${expectedComponentName}`)
      },
    )
  })

  describe('component structure', () => {
    it('should include correct imports', () => {
      const result = generateReactComponent(
        'test-icon.svg',
        'outline',
        '../../icons/outline/test-icon.svg',
      )

      expect(result).toContain(`import { IconProps } from '../types'`)
      expect(result).toContain(
        `import SvgComponent from '../../icons/outline/test-icon.svg?react'`,
      )
    })

    it('should include proper component props', () => {
      const result = generateReactComponent(
        'test-icon.svg',
        'outline',
        '../../icons/outline/test-icon.svg',
      )

      expect(result).toContain(
        `{ ref, size, rotate, m, mx, my, ml, mr, mt, mb, style, ...props }: IconProps & { ref?: React.Ref<SVGSVGElement> }`,
      )
      expect(result).toContain(`ref={ref}`)
      expect(result).toContain(`width={size || '24'}`)
      expect(result).toContain(`height={size || '24'}`)
      expect(result).toContain(`style={combinedStyles}`)
      expect(result).toContain(`{...props}`)
    })

    it('should use correct relative SVG path', () => {
      const testPath = '../../custom/path/my-icon.svg'
      const result = generateReactComponent('my-icon.svg', 'outline', testPath)

      expect(result).toContain(`import SvgComponent from '${testPath}?react'`)
    })

    it('should generate valid TypeScript component', () => {
      const result = generateReactComponent(
        'arrow-left.svg',
        'solid',
        '../../icons/solid/arrow-left.svg',
      )

      // Check the basic structure of a React component
      expect(result).toContain('const ArrowLeftSolid = (')
      expect(result).toContain(') => {')
      expect(result).toContain('const marginStyles = generateMarginStyles')
      expect(result).toContain('return (')
      expect(result).toContain('<SvgComponent')
      expect(result).toContain('/>')
      expect(result).toContain('export default ArrowLeftSolid')
    })
  })
})
