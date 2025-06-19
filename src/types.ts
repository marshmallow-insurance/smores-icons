import { SVGProps } from 'react'

// Supported icon variants
export type Variant = 'outline' | 'solid' | 'misc'

// Spacing types for margin props
export type Spacing =
  | '8px'
  | '12px'
  | '16px'
  | '24px'
  | '32px'
  | '48px'
  | '64px'
export type SpacingProp = '0' | Spacing | { custom: number | string }

export interface MarginProps {
  m?: SpacingProp
  mx?: SpacingProp | 'auto'
  my?: SpacingProp
  ml?: SpacingProp | 'auto'
  mr?: SpacingProp | 'auto'
  mt?: SpacingProp
  mb?: SpacingProp
}

export interface IconProps extends SVGProps<SVGSVGElement>, MarginProps {
  size?: number | string
  color?: string
  strokeWidth?: number | string
}

export type Icon = React.ForwardRefExoticComponent<
  Omit<IconProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>
