import { describe, expect, it } from 'vitest'
import { validateColors } from '../validateColors'

describe('validateColors', () => {
  const ERROR_MESSAGE = 'Contains hardcoded colors - use "currentColor" instead'

  describe('misc variant', () => {
    it('should allow all color formats', () => {
      const svgContent = `
        <svg fill="#ff0000" stroke="rgb(255, 0, 0)">
          <path fill="blue" stroke="rgba(255, 0, 0, 0.5)"/>
          <circle fill="hsl(120, 100%, 50%)" stroke="hsla(240, 100%, 50%, 0.8)"/>
        </svg>
      `
      expect(validateColors(svgContent, 'misc')).toEqual([])
    })

    it('should allow empty content', () => {
      expect(validateColors('', 'misc')).toEqual([])
    })
  })

  describe('non-misc variants', () => {
    const testVariant = 'outline'

    describe('allowed values', () => {
      const allowedTestCases = [
        {
          name: 'currentColor',
          input: '<svg><path fill="currentColor"/></svg>',
        },
        {
          name: 'none',
          input: '<svg><path fill="none"/></svg>',
        },
        {
          name: 'transparent',
          input: '<svg><path fill="transparent"/></svg>',
        },
        {
          name: 'mixed allowed values',
          input: '<svg><path fill="currentColor" stroke="none"/></svg>',
        },
        {
          name: 'empty content',
          input: '',
        },
        {
          name: 'no color attributes',
          input: '<svg><path d="M12 2l3.09 6.26"/></svg>',
        },
      ]

      it.each(allowedTestCases)('should allow $name', ({ input }) => {
        expect(validateColors(input, testVariant)).toEqual([])
      })
    })

    describe('forbidden values', () => {
      const forbiddenTestCases = [
        {
          name: 'hex colors',
          color: '#ff0000',
        },
        {
          name: '8-digit hex colors',
          color: '#ff000080',
        },
        {
          name: 'rgb colors',
          color: 'rgb(255, 0, 0)',
        },
        {
          name: 'rgba colors',
          color: 'rgba(255, 0, 0, 0.5)',
        },
        {
          name: 'rgb with spaces',
          color: 'rgb( 255 , 0 , 0 )',
        },
        {
          name: 'hsl colors',
          color: 'hsl(120, 100%, 50%)',
        },
        {
          name: 'hsla colors',
          color: 'hsla(240, 100%, 50%, 0.8)',
        },
        {
          name: 'hsl with spaces',
          color: 'hsl( 120 , 100% , 50% )',
        },
        {
          name: 'named colors',
          color: 'red',
        },
        {
          name: 'case-insensitive named colors',
          color: 'RED',
        },
        {
          name: 'case-sensitive allowed values',
          color: 'CurrentColor',
        },
      ]

      it.each(forbiddenTestCases)('should reject $name', ({ color }) => {
        const svgContent = `<svg><path fill="${color}"/></svg>`
        const result = validateColors(svgContent, testVariant)

        expect(result).toHaveLength(1)
        expect(result[0]).toBe(ERROR_MESSAGE)
      })
    })
  })
})
