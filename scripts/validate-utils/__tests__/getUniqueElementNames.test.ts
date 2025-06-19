import { describe, expect, it } from 'vitest'
import { getUniqueElementNames } from '../getUniqueElementNames'

describe('getUniqueElementNames', () => {
  describe('basic functionality', () => {
    const basicTestCases = [
      {
        name: 'simple SVG',
        input: '<svg><path d="M12 2l3.09 6.26"/></svg>',
        expected: ['svg', 'path'],
      },
      {
        name: 'self-closing tags',
        input: '<svg><path d="M12 2"/><circle cx="12" cy="12" r="5"/></svg>',
        expected: ['svg', 'path', 'circle'],
      },
      {
        name: 'nested elements',
        input: '<svg><g><g><path d="M12 2"/></g></g></svg>',
        expected: ['svg', 'g', 'path'],
      },
      {
        name: 'empty SVG',
        input: '<svg></svg>',
        expected: ['svg'],
      },
      {
        name: 'empty string',
        input: '',
        expected: [],
      },
    ]

    it.each(basicTestCases)('should handle $name', ({ input, expected }) => {
      expect(getUniqueElementNames(input)).toEqual(expected)
    })

    it('should extract unique elements from complex SVG', () => {
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M12 2l3.09 6.26"/>
            <circle cx="12" cy="12" r="5"/>
            <rect x="5" y="5" width="10" height="10"/>
          </g>
        </svg>
      `
      expect(getUniqueElementNames(svgContent)).toEqual([
        'svg',
        'g',
        'path',
        'circle',
        'rect',
      ])
    })
  })

  describe('edge cases', () => {
    const edgeTestCases = [
      {
        name: 'malformed XML',
        input: '<svg><path><circle></svg>',
        expected: ['svg', 'path', 'circle'],
      },
      {
        name: 'case sensitivity',
        input: '<SVG><Path d="M12 2"/></SVG>',
        expected: ['SVG', 'Path'],
      },
      {
        name: 'namespaced elements',
        input:
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#icon"/></svg>',
        expected: ['svg', 'use'],
      },
      {
        name: 'text content elements',
        input:
          '<svg><text>Content</text><title>Title</title><desc>Description</desc></svg>',
        expected: ['svg', 'text', 'title', 'desc'],
      },
    ]

    it.each(edgeTestCases)('should handle $name', ({ input, expected }) => {
      expect(getUniqueElementNames(input)).toEqual(expected)
    })

    it('should return unique element names only', () => {
      const svgContent = `
        <svg>
          <path d="M12 2"/>
          <path d="M5 5"/>
          <path d="M15 15"/>
        </svg>
      `
      expect(getUniqueElementNames(svgContent)).toEqual(['svg', 'path'])
    })

    it('should handle elements with complex attributes and formatting', () => {
      const svgContent = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24" height="24"
          viewBox="0 0 24 24"
        >
          <!-- Comment -->
          <path
            d="M12 2l3.09 6.26"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      `
      expect(getUniqueElementNames(svgContent)).toEqual(['svg', 'path'])
    })

    it('should handle very long element names', () => {
      const longName = 'a'.repeat(100)
      const svgContent = `<svg><${longName}></${longName}></svg>`
      expect(getUniqueElementNames(svgContent)).toEqual(['svg', longName])
    })
  })
})
