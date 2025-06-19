// Export base components and types
export type {
  IconProps,
  Icon as IconType,
  MarginProps,
  Spacing,
  SpacingProp,
} from './types'
export { generateMarginStyles, resolveSpacing } from './utils/spacing'

// Re-export all generated icon components
// @ts-ignore this is a generated file - running npm run generate will create it
export * from './generated-exports'
