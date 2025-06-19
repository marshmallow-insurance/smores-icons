import { describe, expect, it } from 'vitest'
import {
  FORBIDDEN_ELEMENTS,
  validateForbiddenElements,
} from '../validateForbiddenElements'

describe('validateForbiddenElements', () => {
  const allowedElements = [
    'svg',
    'path',
    'circle',
    'rect',
    'line',
    'polygon',
    'polyline',
    'ellipse',
    'g',
  ]

  describe('non-misc variants', () => {
    const testVariant = 'outline'

    const validationTestCases = [
      {
        name: 'allowed elements only',
        elements: allowedElements,
        expectedErrors: [],
      },
      {
        name: 'empty elements array',
        elements: [],
        expectedErrors: [],
      },
      {
        name: 'single forbidden element',
        elements: ['svg', 'path', 'text'],
        expectedErrors: ['Contains forbidden elements: text'],
      },
      {
        name: 'multiple forbidden elements',
        elements: ['svg', 'text', 'image', 'path'],
        expectedErrors: ['Contains forbidden elements: text, image'],
      },
      {
        name: 'case sensitivity (uppercase forbidden names)',
        elements: ['svg', 'TEXT', 'Image'],
        expectedErrors: [],
      },
      {
        name: 'elements with similar names',
        elements: ['svg', 'textPath', 'imageData', 'path'],
        expectedErrors: [],
      },
    ]

    it.each(validationTestCases)(
      'should handle $name',
      ({ elements, expectedErrors }) => {
        expect(validateForbiddenElements(elements, testVariant)).toEqual(
          expectedErrors,
        )
      },
    )
  })

  describe('misc variant', () => {
    const miscTestCases = [
      {
        name: 'all forbidden elements',
        elements: [...FORBIDDEN_ELEMENTS],
      },
      {
        name: 'mixed allowed and forbidden elements',
        elements: [...allowedElements, ...FORBIDDEN_ELEMENTS],
      },
      {
        name: 'empty array',
        elements: [],
      },
      {
        name: 'only forbidden elements',
        elements: ['text', 'image', 'use', 'filter', 'gradient'],
      },
    ]

    it.each(miscTestCases)(
      'should return no errors for $name',
      ({ elements }) => {
        expect(validateForbiddenElements(elements, 'misc')).toEqual([])
      },
    )
  })
})
