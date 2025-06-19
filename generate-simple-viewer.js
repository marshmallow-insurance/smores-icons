#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const iconsDir = path.join(__dirname, 'icons')
const outputFile = path.join(__dirname, 'simple-icon-viewer.html')

// Scan for all SVG files
function scanIcons() {
  const icons = []
  const variants = ['outline', 'solid', 'misc']

  variants.forEach((variant) => {
    const variantDir = path.join(iconsDir, variant)

    if (!fs.existsSync(variantDir)) {
      console.warn(`Warning: ${variant} directory not found`)
      return
    }

    const files = fs.readdirSync(variantDir)

    files.forEach((file) => {
      if (file.endsWith('.svg')) {
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
          console.warn(`Failed to read ${file}:`, error.message)
        }
      }
    })
  })

  return icons
}

// Generate HTML template
function generateHTML(icons) {
  const iconsJson = JSON.stringify(icons, null, 2)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marshmallow Icons - Simple Viewer</title>
    <style>
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background: #FBF8F5; /* coconut */
        color: #0E0E0C; /* boba */
        font-weight: 400;
      }

      .header {
        background: #FFFFFF; /* cream */
        border-bottom: 1px solid #D2D2D2; /* chia */
        padding: 1.5rem 2rem;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .header h1 {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #FF69B5; /* lollipop */
      }

      .controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: center;
      }

      .search-input {
        flex: 1;
        min-width: 300px;
        padding: 0.75rem 1rem;
        border: 1px solid #D2D2D2; /* chia */
        border-radius: 0.5rem;
        font-size: 1rem;
        background: #FFFFFF; /* cream */
        color: #0E0E0C; /* boba */
        transition: all 0.2s ease;
      }

      .search-input:focus {
        outline: none;
        border-color: #FF69B5; /* lollipop */
      }

      .search-input::placeholder {
        color: #636768; /* sesame */
      }

      .filter-buttons {
        display: flex;
        gap: 0.5rem;
      }

      .filter-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #D2D2D2; /* chia */
        background: #FFFFFF; /* cream */
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 500;
        color: #292924; /* liquorice */
        transition: all 0.2s ease;
      }

      .filter-btn:hover {
        background: #F8F2EA; /* mascarpone */
        border-color: #FF88C8; /* marshmallowPink */
      }

      .filter-btn.active {
        background: #FF69B5; /* lollipop */
        color: #FFFFFF;
        border-color: #FF69B5;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
      }

      .stats {
        text-align: center;
        margin-bottom: 2rem;
        color: #636768; /* sesame */
        font-weight: 500;
      }

      .icon-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      .icon-group {
        background: #FFFFFF; /* cream */
        border: 1px solid #F1E9DC; /* custard */
        border-radius: 1rem;
        padding: 1.5rem;
        transition: all 0.3s ease;
      }

      .icon-group:hover {
        transform: translateY(-2px);
      }

      .icon-group h3 {
        font-size: 1.125rem;
        font-weight: 700;
        margin-bottom: 1rem;
        color: #FF69B5; /* lollipop */
        text-transform: capitalize;
      }

      .icon-group-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .icon-group-header h3 {
        margin-bottom: 0;
        flex: 1;
      }

      .variant-badges {
        display: flex;
        gap: 0.375rem;
        flex-wrap: wrap;
      }

      .icon-variants {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }

      .icon-variant {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }

      .icon-variant:hover {
        background: #FBF8F5; /* coconut */
      }

      .icon-display {
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.375rem;
        padding: 0.25rem;
        transition: all 0.2s ease;
      }

      .icon-display svg {
        width: 100%;
        height: 100%;
        color: #636768; /* sesame */
        transition: color 0.2s ease;
      }

      .icon-variant:hover .icon-display svg {
        color: #0E0E0C; /* boba - higher contrast */
      }

      .icon-name {
        flex: 1;
        font-size: 0.875rem;
        color: #636768; /* sesame */
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        font-weight: 500;
      }

      .variant-badge {
        font-size: 0.625rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.025em;
      }

      .variant-outline {
        background: #89A2B6; /* blueberry */
        color: #FFFFFF;
      }

      .variant-solid {
        background: #838E49; /* pistachio */
        color: #FFFFFF;
      }

      .variant-misc {
        background: #C26B2A; /* caramel */
        color: #FFFFFF;
      }

      .copy-btn {
        opacity: 0;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        background: #F1E9DC; /* custard */
        border: 1px solid #D2D2D2; /* chia */
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #292924; /* liquorice */
        font-weight: 500;
      }

      .icon-variant:hover .copy-btn {
        opacity: 1;
      }

      .copy-btn:hover {
        background: #FF88C8; /* marshmallowPink */
        color: #FFFFFF;
        border-color: #FF69B5; /* lollipop */
        transform: scale(1.05);
      }

      .copy-btn:active {
        transform: scale(0.95);
      }

      .no-results {
        text-align: center;
        padding: 4rem 2rem;
        color: #636768; /* sesame */
        display: none;
      }

      .no-results h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #292924; /* liquorice */
      }

      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #F1E9DC; /* custard */
      }

      ::-webkit-scrollbar-thumb {
        background: #FF69B5; /* lollipop */
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #FF88C8; /* marshmallowPink */
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Marshmallow Icons - Simple Viewer</h1>
      <div class="controls">
        <input
          type="text"
          class="search-input"
          placeholder="Search icons..."
          id="searchInput"
        />
        <div class="filter-buttons">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="outline">Outline</button>
          <button class="filter-btn" data-filter="solid">Solid</button>
          <button class="filter-btn" data-filter="misc">Misc</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="stats" id="stats"></div>
      <div class="icon-grid" id="iconGrid"></div>
      <div class="no-results" id="noResults">
        <h3>No icons found</h3>
        <p>Try adjusting your search or filter.</p>
      </div>
    </div>

    <script>
      // Icon data embedded directly in the HTML
      const ALL_ICONS = ${iconsJson};
      
      let filteredIcons = ALL_ICONS;
      let currentFilter = 'all';
      let currentSearch = '';

      function groupIconsByBaseName(icons) {
        const groups = {};
        
        icons.forEach(icon => {
          // Extract base name by removing common suffixes
          let baseName = icon.name;
          
          // Remove variant-specific suffixes if they exist
          baseName = baseName.replace(/-(outline|solid|misc)$/, '');
          
          if (!groups[baseName]) {
            groups[baseName] = [];
          }
          
          groups[baseName].push(icon);
        });

        // Sort variants within each group
        Object.keys(groups).forEach(baseName => {
          groups[baseName].sort((a, b) => {
            const order = { outline: 0, solid: 1, misc: 2 };
            return order[a.variant] - order[b.variant];
          });
        });

        return groups;
      }

      function renderIcons() {
        const grid = document.getElementById('iconGrid');
        const noResults = document.getElementById('noResults');
        const stats = document.getElementById('stats');
        
        if (filteredIcons.length === 0) {
          grid.style.display = 'none';
          stats.style.display = 'none';
          noResults.style.display = 'block';
          return;
        }

        const groups = groupIconsByBaseName(filteredIcons);
        const groupNames = Object.keys(groups).sort();

        grid.style.display = 'grid';
        stats.style.display = 'block';
        noResults.style.display = 'none';

        grid.innerHTML = groupNames.map(baseName => {
          const variants = groups[baseName];
          
          // Convert to PascalCase
          const pascalCaseName = baseName
            .split(/[-_\s]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
          
          // Get unique variants for this group
          const availableVariants = [...new Set(variants.map(icon => icon.variant))];
          
          return \`
            <div class="icon-group">
              <div class="icon-group-header">
                <h3>\${pascalCaseName}</h3>
                <div class="variant-badges">
                  \${availableVariants.map(variant => \`
                    <span class="variant-badge variant-\${variant}">\${variant}</span>
                  \`).join('')}
                </div>
              </div>
              <div class="icon-variants">
                \${variants.map(icon => \`
                  <div class="icon-variant">
                    <div class="icon-display">
                      \${icon.svgContent}
                    </div>
                    <div class="icon-name">\${icon.name}</div>
                    <button class="copy-btn" onclick="copyToClipboard('\${icon.name}')">Copy</button>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
        }).join('');
      }

      function filterIcons() {
        const searchTerm = currentSearch.toLowerCase();
        
        filteredIcons = ALL_ICONS.filter(icon => {
          const matchesSearch = !searchTerm || 
                              icon.name.toLowerCase().includes(searchTerm);
          
          const matchesFilter = currentFilter === 'all' || icon.variant === currentFilter;
          
          return matchesSearch && matchesFilter;
        });

        renderIcons();
        updateStats();
      }

      function updateStats() {
        const stats = document.getElementById('stats');
        const total = ALL_ICONS.length;
        const visible = filteredIcons.length;
        const groups = Object.keys(groupIconsByBaseName(filteredIcons)).length;
        
        stats.textContent = \`Showing \${visible} of \${total} icons in \${groups} groups\`;
      }

      function copyToClipboard(iconName) {
        navigator.clipboard.writeText(iconName).then(() => {
          console.log(\`Copied \${iconName} to clipboard\`);
          // You could add a toast notification here
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
      }

      // Event listeners
      document.getElementById('searchInput').addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterIcons();
      });

      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          currentFilter = e.target.dataset.filter;
          filterIcons();
        });
      });

      // Initialize
      filterIcons();
    </script>
  </body>
</html>`
}

// Main execution
console.log('🔍 Scanning icons directory...')
const icons = scanIcons()

console.log(`📊 Found ${icons.length} icons:`)
const stats = icons.reduce((acc, icon) => {
  acc[icon.variant] = (acc[icon.variant] || 0) + 1
  return acc
}, {})

Object.entries(stats).forEach(([variant, count]) => {
  console.log(`   ${variant}: ${count} icons`)
})

console.log('\n📝 Generating HTML viewer...')
const html = generateHTML(icons)

fs.writeFileSync(outputFile, html, 'utf8')

console.log(`✅ Generated simple icon viewer: ${outputFile}`)
console.log('\n🚀 To view the icons:')
console.log('   1. Open simple-icon-viewer.html in your browser')
console.log('   2. Or serve it with: npx serve .')
console.log('   3. Or use: python -m http.server 8000')
