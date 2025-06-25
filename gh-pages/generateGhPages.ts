import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { fileURLToPath } from 'url'
import { GhPagesBase } from './GhPagesBase'

// Types
export interface Icon {
  name: string
  variant: string
  filename: string
  path: string
  svgContent: string
}

interface IconStats {
  [variant: string]: number
}

// Configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG = {
  iconsDir: path.join(__dirname, '..', 'icons'),
  outputFile: path.join(__dirname, 'index.html'),
  variants: ['outline', 'solid', 'misc'] as const,
}

// Icon Scanning Functions
function scanVariantDirectory(variant: string): Icon[] {
  const variantDir = path.join(CONFIG.iconsDir, variant)

  if (!fs.existsSync(variantDir)) {
    console.warn(`Warning: ${variant} directory not found`)
    return []
  }

  const files = fs.readdirSync(variantDir)
  const icons: Icon[] = []

  files.forEach((file) => {
    if (!file.endsWith('.svg')) return

    const iconName = file.replace('.svg', '')
    const filePath = path.join(variantDir, file)

    try {
      const svgContent = fs.readFileSync(filePath, 'utf8')

      icons.push({
        name: iconName,
        variant: variant,
        filename: file,
        path: `icons/${variant}/${file}`,
        svgContent: svgContent,
      })
    } catch (error) {
      console.warn(`Failed to read ${file}:`, (error as Error).message)
    }
  })

  return icons
}

function scanAllIcons(): Icon[] {
  return CONFIG.variants.flatMap(scanVariantDirectory)
}

// Statistics Functions
function calculateIconStats(icons: Icon[]): IconStats {
  return icons.reduce((acc, icon) => {
    acc[icon.variant] = (acc[icon.variant] || 0) + 1
    return acc
  }, {} as IconStats)
}

function printIconStats(stats: IconStats, totalCount: number): void {
  console.log(`📊 Found ${totalCount} icons:`)

  Object.entries(stats).forEach(([variant, count]) => {
    console.log(`   ${variant}: ${count} icons`)
  })
}

// HTML Generation
function generateHTML(icons: Icon[]): string {
  const element = React.createElement(GhPagesBase, { icons })
  return '<!DOCTYPE html>' + renderToStaticMarkup(element)
}

// File I/O Functions
function writeHTMLFile(html: string): void {
  fs.writeFileSync(CONFIG.outputFile, html, 'utf8')
  console.log(`✅ Generated simple icon viewer: ${CONFIG.outputFile}`)
}

// Main Function
function main(): void {
  console.log('🔍 Scanning icons directory...')

  const icons = scanAllIcons()
  const stats = calculateIconStats(icons)

  printIconStats(stats, icons.length)

  console.log('\n📝 Generating HTML viewer...')
  const html = generateHTML(icons)

  writeHTMLFile(html)
}

// Execute
main()
