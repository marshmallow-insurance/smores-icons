import fs from 'fs'
import { ICONS_DIR, REACT_OUTPUT_DIR } from './constants'

export function setupDirectories(): boolean {
  if (!fs.existsSync(ICONS_DIR)) {
    console.log('Icons directory not found. Creating it...')
    fs.mkdirSync(ICONS_DIR, { recursive: true })
    return false
  }

  if (!fs.existsSync(REACT_OUTPUT_DIR)) {
    fs.mkdirSync(REACT_OUTPUT_DIR, { recursive: true })
  }

  return true
}
