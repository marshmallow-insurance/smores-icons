#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { Variant } from '../src/types'
import { extractSvgAttributes } from './validate-utils/extractSvgAttributes'
import { getUniqueElementNames } from './validate-utils/getUniqueElementNames'
import { validateFileSize } from './validate-utils/validateFileSize'
import { validateForbiddenAttributes } from './validate-utils/validateForbiddenAttributes'
import { validateForbiddenElements } from './validate-utils/validateForbiddenElements'
import { validateHardCodedColors } from './validate-utils/validateHardCodedColors'
import { validateKebabCase } from './validate-utils/validateKebabCase'
import { validateRequiredAttributes } from './validate-utils/validateRequiredAttributes'

const ICONS_DIR = path.join(process.cwd(), 'icons')
const SUPPORTED_VARIANTS: Variant[] = ['outline', 'solid', 'misc']

interface ValidationResult {
  file: string
  valid: boolean
  errors: string[]
  warnings: string[]
}

function validateSvg(filePath: string, variant: Variant): ValidationResult {
  const filename = path.basename(filePath)
  const result: ValidationResult = {
    file: `${variant}/${filename}`,
    valid: true,
    errors: [],
    warnings: [],
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const attributes = extractSvgAttributes(content)
    const uniqueElements = getUniqueElementNames(content)

    const errors = [
      ...validateKebabCase(filename),
      ...validateRequiredAttributes(attributes, variant),
      ...validateForbiddenAttributes(attributes),
      ...validateForbiddenElements(uniqueElements, variant),
      ...validateHardCodedColors(content, variant),
    ]
    const warnings = [...validateFileSize(filePath, variant)]

    result.warnings = warnings
    result.errors = errors

    result.valid = errors.length === 0
  } catch (error) {
    result.errors = [`Failed to read file: ${error}`]
    result.valid = false
  }

  return result
}

function printResultSection(
  title: string,
  results: ValidationResult[],
  showWarnings = true,
): void {
  if (results.length === 0) return

  console.log(`\n${title} (${results.length}):`)
  results.forEach((result) => {
    console.log(`   ${result.file}`)
    result.errors.forEach((error) => console.log(`     ❌ ${error}`))
    if (showWarnings) {
      result.warnings.forEach((warning) => console.log(`     ⚠️  ${warning}`))
    }
  })
}

function printResults(allResults: ValidationResult[]): boolean {
  const validFiles = allResults.filter((r) => r.valid)
  const invalidFiles = allResults.filter((r) => !r.valid)
  const validCount = validFiles.length
  const invalidCount = invalidFiles.length
  const totalCount = validCount + invalidCount

  printResultSection('✅ Valid files', validFiles)
  printResultSection('❌ Invalid files', invalidFiles)

  console.log('\n📊 Summary:')
  console.log(`   📝 Total icons: ${totalCount}`)
  console.log(`   ✅ Valid icons: ${validCount}`)

  if (invalidCount > 0) {
    console.log(`   ❌ Invalid icons: ${invalidCount}`)
  } else {
    console.log('   ✅ All icons are valid!')
  }

  return invalidFiles.length === 0
}

function getSvgFilesFromFolderPath(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) {
    return []
  }

  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => path.join(folderPath, file))
}

function validateIconVariantFolder(variant: Variant): ValidationResult[] {
  const folderPath = path.join(ICONS_DIR, variant)
  const svgFiles = getSvgFilesFromFolderPath(folderPath)

  if (svgFiles.length === 0) {
    const message = fs.existsSync(folderPath)
      ? `📁 No SVG files found in ${variant} directory`
      : `⚠️  Folder ${variant} not found, skipping...`
    console.log(message)
    return []
  }

  console.log(`\n📁 Validating ${variant} folder (${svgFiles.length} files)`)
  return svgFiles.map((filePath) => validateSvg(filePath, variant))
}

function validateAllSvgs(): void {
  console.log('🎨 Validating SVG icons...\n')

  if (!fs.existsSync(ICONS_DIR)) {
    console.log('❌ Icons directory not found')
    process.exit(1)
  }

  const allResults = SUPPORTED_VARIANTS.flatMap(
    validateIconVariantFolder,
  ).filter(Boolean)

  if (allResults.length === 0) {
    console.log('📁 No SVG files found to validate')
    return
  }

  const allValid = printResults(allResults)
  if (!allValid) {
    process.exit(1)
  }
}

validateAllSvgs()
