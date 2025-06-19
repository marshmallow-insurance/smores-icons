import { describe, expect, it } from 'vitest'
import { extractSvgAttributes } from '../extractSvgAttributes'

describe('extractSvgAttributes', () => {
  describe('basic functionality', () => {
    const basicTestCases = [
      {
        name: 'basic SVG attributes',
        input:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"></svg>',
        expected: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
        },
      },
      {
        name: 'attributes with single quotes',
        input: `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'></svg>`,
        expected: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
        },
      },
      {
        name: 'attributes with mixed quotes',
        input: `<svg xmlns="http://www.w3.org/2000/svg" width='24' height="24"></svg>`,
        expected: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
        },
      },
      {
        name: 'kebab-case attributes',
        input:
          '<svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" fill-rule="evenodd"></svg>',
        expected: {
          xmlns: 'http://www.w3.org/2000/svg',
          'stroke-width': '2',
          'fill-rule': 'evenodd',
        },
      },
      {
        name: 'self-closing SVG tags',
        input:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"/>',
        expected: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
        },
      },
    ]

    it.each(basicTestCases)('should extract $name', ({ input, expected }) => {
      expect(extractSvgAttributes(input)).toEqual(expected)
    })
  })

  describe('edge cases', () => {
    const edgeTestCases = [
      {
        name: 'no SVG tag found',
        input: '<div>Not an SVG</div>',
        expected: {},
      },
      {
        name: 'SVG tag with no attributes',
        input: '<svg></svg>',
        expected: {},
      },
      {
        name: 'empty string input',
        input: '',
        expected: {},
      },
    ]

    it.each(edgeTestCases)(
      'should return empty object when $name',
      ({ input, expected }) => {
        expect(extractSvgAttributes(input)).toEqual(expected)
      },
    )
  })
})
