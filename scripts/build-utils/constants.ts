import path from 'path'
import { Variant } from '../../src/types'

export const ICONS_DIR = path.join(process.cwd(), 'icons')
export const REACT_OUTPUT_DIR = path.join(process.cwd(), 'src', 'icons')
export const SUPPORTED_VARIANTS: Variant[] = ['outline', 'solid', 'misc']

export const VARIANT_SUFFIX_MAP: Record<Variant, string> = {
  outline: 'Outline',
  solid: 'Solid',
  misc: 'Misc',
}

export interface ProcessedIcon {
  componentName: string
  exportStatement: string
}
