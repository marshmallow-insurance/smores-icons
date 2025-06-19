import { MarginProps, SpacingProp } from '../types'

/**
 * Resolve spacing value to CSS value
 */
export function resolveSpacing(value: SpacingProp): string {
  if (value === '0') return '0'
  if (typeof value === 'string') return value
  if (typeof value === 'object' && 'custom' in value) {
    return typeof value.custom === 'number' ? `${value.custom}px` : value.custom
  }
  return '0'
}

/**
 * Generate margin styles from margin props
 */
export function generateMarginStyles(props: MarginProps): React.CSSProperties {
  const { m, mx, my, ml, mr, mt, mb } = props
  const styles: React.CSSProperties = {}

  if (m) {
    styles.margin = resolveSpacing(m)
  }

  if (mx) {
    const value = mx === 'auto' ? 'auto' : resolveSpacing(mx)
    styles.marginLeft = value
    styles.marginRight = value
  }

  if (my) {
    const value = resolveSpacing(my)
    styles.marginTop = value
    styles.marginBottom = value
  }

  if (ml) {
    styles.marginLeft = ml === 'auto' ? 'auto' : resolveSpacing(ml)
  }

  if (mr) {
    styles.marginRight = mr === 'auto' ? 'auto' : resolveSpacing(mr)
  }

  if (mt) {
    styles.marginTop = resolveSpacing(mt)
  }

  if (mb) {
    styles.marginBottom = resolveSpacing(mb)
  }

  return styles
}
