import { describe, expect, it } from 'vitest'
import {
  FORBIDDEN_ATTRIBUTES,
  validateForbiddenAttributes,
} from '../validateForbiddenAttributes'

describe('validateForbiddenAttributes', () => {
  describe('valid attributes', () => {
    const validTestCases = [
      {
        name: 'allowed attributes',
        attributes: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
          fill: 'currentColor',
          stroke: 'none',
          'stroke-width': '2',
        },
      },
      {
        name: 'empty attributes',
        attributes: {},
      },
      {
        name: 'kebab-case attributes',
        attributes: {
          'stroke-width': '2',
          'fill-rule': 'evenodd',
          'stroke-linecap': 'round',
        },
      },
      {
        name: 'data attributes',
        attributes: {
          'data-testid': 'icon',
          'data-name': 'test-icon',
        },
      },
    ]

    it.each(validTestCases)(
      'should return no errors for $name',
      ({ attributes }) => {
        expect(
          validateForbiddenAttributes(attributes as Record<string, string>),
        ).toEqual([])
      },
    )
  })

  describe('forbidden attributes', () => {
    const forbiddenTestCases = FORBIDDEN_ATTRIBUTES.map((attr) => ({
      name: `${attr} attribute`,
      attributes: { [attr]: 'value' },
      expectedErrors: [`Forbidden attribute: ${attr}`],
    }))

    it.each(forbiddenTestCases)(
      'should return error for $name',
      ({ attributes, expectedErrors }) => {
        const result = validateForbiddenAttributes(attributes)
        expect(result).toEqual(expectedErrors)
      },
    )

    it('should return multiple errors for multiple forbidden attributes', () => {
      const attributes = {
        id: 'icon',
        class: 'my-icon',
        style: 'color: red;',
      }
      const result = validateForbiddenAttributes(attributes)

      expect(result).toHaveLength(3)
      expect(result).toContain('Forbidden attribute: id')
      expect(result).toContain('Forbidden attribute: class')
      expect(result).toContain('Forbidden attribute: style')
    })

    it('should return errors only for forbidden attributes in mixed scenarios', () => {
      const attributes = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '24',
        id: 'my-icon',
        fill: 'currentColor',
        class: 'icon',
      }
      const result = validateForbiddenAttributes(attributes)

      expect(result).toHaveLength(2)
      expect(result).toContain('Forbidden attribute: id')
      expect(result).toContain('Forbidden attribute: class')
    })
  })
})
