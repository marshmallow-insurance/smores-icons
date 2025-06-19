import fs from 'fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { validateFileSize } from '../validateFileSize'

// Mock fs module
vi.mock('fs')
const mockedFs = vi.mocked(fs)

describe('validateFileSize', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('size validation by variant', () => {
    const sizeTestCases = [
      // outline/solid variants (10KB limit)
      {
        name: 'outline - under limit',
        variant: 'outline' as const,
        fileSize: 5 * 1024,
        expectedWarnings: [],
      },
      {
        name: 'outline - at limit',
        variant: 'outline' as const,
        fileSize: 10 * 1024,
        expectedWarnings: [],
      },
      {
        name: 'outline - over limit',
        variant: 'outline' as const,
        fileSize: 12 * 1024,
        expectedWarnings: ['File size is over 10KB - consider optimizing'],
      },
      {
        name: 'solid - over limit',
        variant: 'solid' as const,
        fileSize: 15 * 1024,
        expectedWarnings: ['File size is over 10KB - consider optimizing'],
      },
      // misc variant (20KB limit)
      {
        name: 'misc - under limit',
        variant: 'misc' as const,
        fileSize: 15 * 1024,
        expectedWarnings: [],
      },
      {
        name: 'misc - at limit',
        variant: 'misc' as const,
        fileSize: 20 * 1024,
        expectedWarnings: [],
      },
      {
        name: 'misc - over limit',
        variant: 'misc' as const,
        fileSize: 25 * 1024,
        expectedWarnings: ['File size is over 20KB - consider optimizing'],
      },
    ]

    it.each(sizeTestCases)(
      'should handle $name',
      ({ variant, fileSize, expectedWarnings }) => {
        mockedFs.statSync.mockReturnValue({ size: fileSize } as fs.Stats)

        const result = validateFileSize('/path/to/icon.svg', variant)
        expect(result).toEqual(expectedWarnings)
      },
    )
  })

  describe('edge cases', () => {
    const edgeTestCases = [
      {
        name: 'empty file',
        fileSize: 0,
        expectedWarnings: [],
      },
      {
        name: 'very small file',
        fileSize: 100,
        expectedWarnings: [],
      },
      {
        name: 'just over limit by 1 byte',
        fileSize: 10 * 1024 + 1,
        expectedWarnings: ['File size is over 10KB - consider optimizing'],
      },
    ]

    it.each(edgeTestCases)(
      'should handle $name',
      ({ fileSize, expectedWarnings }) => {
        mockedFs.statSync.mockReturnValue({ size: fileSize } as fs.Stats)

        const result = validateFileSize('/path/to/icon.svg', 'outline')
        expect(result).toEqual(expectedWarnings)
      },
    )

    it('should handle file system errors', () => {
      mockedFs.statSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      expect(() =>
        validateFileSize('/nonexistent/file.svg', 'outline'),
      ).toThrow('File not found')
    })
  })
})
