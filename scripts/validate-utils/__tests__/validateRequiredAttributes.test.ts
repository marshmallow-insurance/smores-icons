import { describe, expect, it } from 'vitest'
import {
  REQUIRED_ATTRIBUTES,
  validateRequiredAttributes,
} from '../validateRequiredAttributes'

describe('validateRequiredAttributes', () => {
  describe('non-misc variants', () => {
    const testVariant = 'outline'

    const validationTestCases = [
      {
        name: 'valid attributes',
        attributes: REQUIRED_ATTRIBUTES,
        expectedErrors: [],
      },
      {
        name: 'empty attributes',
        attributes: {},
        expectedErrors: [
          'Missing or incorrect width="24"',
          'Missing or incorrect height="24"',
          'Missing or incorrect viewBox="0 0 24 24"',
        ],
      },
      {
        name: 'incorrect width',
        attributes: { ...REQUIRED_ATTRIBUTES, width: '20' },
        expectedErrors: ['Missing or incorrect width="24"'],
      },
      {
        name: 'multiple incorrect attributes',
        attributes: { xmlns: 'wrong', width: '20' },
        expectedErrors: [
          'Missing or incorrect width="24"',
          'Missing or incorrect height="24"',
          'Missing or incorrect viewBox="0 0 24 24"',
        ],
      },
    ]

    it.each(validationTestCases)(
      'should handle $name',
      ({ attributes, expectedErrors }) => {
        const result = validateRequiredAttributes(
          attributes as Record<string, string>,
          testVariant,
        )
        expect(result).toEqual(expectedErrors)
      },
    )
  })

  describe('misc variant', () => {
    const miscTestCases = [
      {
        name: 'empty attributes',
        attributes: {},
      },
      {
        name: 'invalid attributes',
        attributes: {
          xmlns: 'wrong',
          width: '20',
          height: '20',
          viewBox: '0 0 20 20',
        },
      },
      {
        name: 'valid attributes',
        attributes: REQUIRED_ATTRIBUTES,
      },
    ]

    it.each(miscTestCases)(
      'should return no errors for $name',
      ({ attributes }) => {
        expect(
          validateRequiredAttributes(
            attributes as Record<string, string>,
            'misc',
          ),
        ).toEqual([])
      },
    )
  })

  describe('edge cases', () => {
    it('should handle extra attributes', () => {
      const attributesWithExtras = {
        ...REQUIRED_ATTRIBUTES,
        fill: 'currentColor',
        stroke: 'none',
        'data-testid': 'icon',
      }

      expect(
        validateRequiredAttributes(attributesWithExtras, 'outline'),
      ).toEqual([])
    })
  })
})
