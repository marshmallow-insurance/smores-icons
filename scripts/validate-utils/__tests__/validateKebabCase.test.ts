import { describe, expect, it } from 'vitest'
import { validateKebabCase } from '../validateKebabCase'

describe('validateKebabCase', () => {
  const KEBAB_CASE_ERROR = 'Filename must be in kebab-case (e.g., my-icon.svg)'
  const EXTENSION_ERROR = 'File must have .svg extension'

  describe('valid filenames', () => {
    const validTestCases = [
      {
        name: 'valid kebab-case filename',
        filename: 'my-icon.svg',
      },
      {
        name: 'single word filename',
        filename: 'icon.svg',
      },
      {
        name: 'multiple hyphens',
        filename: 'my-awesome-icon-name.svg',
      },
      {
        name: 'single character filename',
        filename: 'a.svg',
      },
      {
        name: 'very long valid filename',
        filename: 'a'.repeat(100) + '.svg',
      },
    ]

    it.each(validTestCases)(
      'should return no errors for $name',
      ({ filename }) => {
        expect(validateKebabCase(filename)).toEqual([])
      },
    )
  })

  describe('invalid kebab-case format', () => {
    const invalidKebabCaseTestCases = [
      {
        name: 'numbers in filename',
        filename: 'icon-24.svg',
      },
      {
        name: 'filename starting with number',
        filename: '24-hour-clock.svg',
      },
      {
        name: 'camelCase filename',
        filename: 'myIcon.svg',
      },
      {
        name: 'PascalCase filename',
        filename: 'MyIcon.svg',
      },
      {
        name: 'snake_case filename',
        filename: 'my_icon.svg',
      },
      {
        name: 'uppercase letters',
        filename: 'My-Icon.svg',
      },
      {
        name: 'spaces',
        filename: 'my icon.svg',
      },
      {
        name: 'special characters',
        filename: 'my@icon.svg',
      },
      {
        name: 'dots in filename',
        filename: 'my.icon.svg',
      },
      {
        name: 'consecutive hyphens',
        filename: 'my--icon.svg',
      },
      {
        name: 'leading hyphen',
        filename: '-my-icon.svg',
      },
      {
        name: 'trailing hyphen',
        filename: 'my-icon-.svg',
      },
      {
        name: 'only extension',
        filename: '.svg',
      },
    ]

    it.each(invalidKebabCaseTestCases)(
      'should return error for $name',
      ({ filename }) => {
        const result = validateKebabCase(filename)
        expect(result).toContain(KEBAB_CASE_ERROR)
      },
    )
  })

  describe('file extension validation', () => {
    const invalidExtensionTestCases = [
      {
        name: 'missing extension',
        filename: 'my-icon',
      },
      {
        name: 'wrong extension',
        filename: 'my-icon.png',
      },
      {
        name: 'uppercase extension',
        filename: 'my-icon.SVG',
      },
      {
        name: 'mixed case extension',
        filename: 'my-icon.Svg',
      },
      {
        name: 'double extension',
        filename: 'my-icon.svg.bak',
      },
    ]

    it.each(invalidExtensionTestCases)(
      'should return error for $name',
      ({ filename }) => {
        const result = validateKebabCase(filename)
        expect(result).toContain(EXTENSION_ERROR)
      },
    )
  })

  describe('multiple errors', () => {
    const multipleErrorTestCases = [
      {
        name: 'kebab-case and extension errors',
        filename: 'MyIcon.png',
        expectedErrors: [KEBAB_CASE_ERROR, EXTENSION_ERROR],
      },
      {
        name: 'invalid filename without extension',
        filename: 'MyIcon',
        expectedErrors: [KEBAB_CASE_ERROR, EXTENSION_ERROR],
      },
      {
        name: 'empty string',
        filename: '',
        expectedErrors: [KEBAB_CASE_ERROR, EXTENSION_ERROR],
      },
    ]

    it.each(multipleErrorTestCases)(
      'should return both errors for $name',
      ({ filename, expectedErrors }) => {
        const result = validateKebabCase(filename)
        expect(result).toHaveLength(expectedErrors.length)
        expectedErrors.forEach((error) => {
          expect(result).toContain(error)
        })
      },
    )
  })
})
