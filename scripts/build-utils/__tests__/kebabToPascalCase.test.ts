import { describe, expect, it } from 'vitest'
import { kebabToPascalCase } from '../kebabToPascalCase'

describe('kebabToPascalCase', () => {
  describe('valid kebab-case conversions', () => {
    const conversionTestCases = [
      {
        name: 'simple kebab-case',
        input: 'my-icon.svg',
        expected: 'MyIcon',
      },
      {
        name: 'single word',
        input: 'icon.svg',
        expected: 'Icon',
      },
      {
        name: 'multiple hyphens',
        input: 'my-awesome-icon-name.svg',
        expected: 'MyAwesomeIconName',
      },
      {
        name: 'long filename',
        input: 'very-long-icon-name-with-many-parts.svg',
        expected: 'VeryLongIconNameWithManyParts',
      },
    ]

    it.each(conversionTestCases)(
      'should convert $name',
      ({ input, expected }) => {
        expect(kebabToPascalCase(input)).toBe(expected)
      },
    )
  })

  describe('invalid input handling', () => {
    const invalidTestCases = [
      {
        name: 'camelCase filename',
        input: 'myIcon.svg',
      },
      {
        name: 'snake_case filename',
        input: 'my_icon.svg',
      },
      {
        name: 'uppercase letters',
        input: 'My-Icon.svg',
      },
      {
        name: 'missing extension',
        input: 'my-icon',
      },
      {
        name: 'wrong extension',
        input: 'my-icon.png',
      },
      {
        name: 'spaces in filename',
        input: 'my icon.svg',
      },
    ]

    it.each(invalidTestCases)('should throw error for $name', ({ input }) => {
      expect(() => kebabToPascalCase(input)).toThrow('Invalid filename format')
    })
  })
})
