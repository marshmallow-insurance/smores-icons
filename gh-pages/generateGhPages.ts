import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { fileURLToPath } from 'url'
import { GhPagesBase } from './GhPagesBase'

export interface Icon {
  name: string
  variant: string
  filename: string
  path: string
  svgContent: string
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CONFIG = {
  iconsDir: path.join(__dirname, '..', 'icons'),
  outputFile: path.join(__dirname, 'index.html'),
  variants: ['outline', 'solid', 'misc'] as const,
}

function scanIconVariantFolder(variant: string): Icon[] {
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

function main(): void {
  console.log('🔍 Scanning icons directory...')

  const icons = CONFIG.variants.flatMap(scanIconVariantFolder)

  console.log('\n📝 Generating HTML viewer...')

  const element = React.createElement(GhPagesBase, { icons })
  const html = '<!DOCTYPE html>' + renderToStaticMarkup(element)

  fs.writeFileSync(CONFIG.outputFile, html, 'utf8')
  console.log(`✅ Generated simple icon viewer: ${CONFIG.outputFile}`)
}

main()
