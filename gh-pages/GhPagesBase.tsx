import { theme } from '../src/theme'
import type { Icon } from './generateGhPages'

interface GhPagesBaseProps {
  icons: Icon[]
}

// This component generates static HTML with embedded vanilla JS
// It doesn't use React state since we're not shipping React to the browser
export function GhPagesBase({ icons }: GhPagesBaseProps) {
  const iconsJson = JSON.stringify(icons, null, 2)

  // Generate CSS with theme colors
  const styles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: ${theme.colors.core.tertiary[60]};
      color: ${theme.colors.core.secondary[120]};
      font-weight: 400;
    }

    .header {
      background: ${theme.colors.core.tertiary[0]};
      border-bottom: 1px solid ${theme.colors.core.secondary[40]};
      padding: 1.5rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${theme.colors.core.primary[120]};
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
      border: 1px solid ${theme.colors.core.secondary[40]};
      border-radius: 0.5rem;
      font-size: 1rem;
      background: ${theme.colors.core.tertiary[0]};
      color: ${theme.colors.core.secondary[120]};
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: ${theme.colors.core.primary[120]};
    }

    .search-input::placeholder {
      color: ${theme.colors.core.secondary[60]};
    }

    .filter-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border: 1px solid ${theme.colors.core.secondary[40]};
      background: ${theme.colors.core.tertiary[0]};
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.colors.core.secondary[100]};
      transition: all 0.2s ease;
    }

    .filter-btn:hover {
      background: ${theme.colors.core.tertiary[100]};
      border-color: ${theme.colors.core.primary[100]};
    }

    .filter-btn.active {
      background: ${theme.colors.core.primary[120]};
      color: #FFFFFF;
      border-color: ${theme.colors.core.primary[120]};
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .stats {
      text-align: center;
      margin-bottom: 2rem;
      color: ${theme.colors.core.secondary[60]};
      font-weight: 500;
    }

    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .icon-group {
      background: ${theme.colors.core.tertiary[0]};
      border: 1px solid ${theme.colors.core.tertiary[120]};
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }

    .icon-group:hover {
      transform: translateY(-2px);
    }

    .variant-badges {
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
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
      background: ${theme.colors.core.tertiary[60]};
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
      color: ${theme.colors.core.secondary[60]};
      transition: color 0.2s ease;
    }

    .icon-variant:hover .icon-display svg {
      color: ${theme.colors.core.secondary[120]};
    }

    .icon-name {
      flex: 1;
      font-size: 0.875rem;
      color: ${theme.colors.core.secondary[60]};
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
      background: ${theme.colors.brand.secondary['2-100']};
      color: #FFFFFF;
    }

    .variant-solid {
      background: ${theme.colors.brand.secondary['3-100']};
      color: #FFFFFF;
    }

    .variant-misc {
      background: ${theme.colors.brand.secondary['4-100']};
      color: #FFFFFF;
    }

    .copy-btn {
      opacity: 0;
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
      background: ${theme.colors.core.tertiary[120]};
      border: 1px solid ${theme.colors.core.primary[40]};
      border-radius: 0.375rem;
      cursor: pointer;
      transition: all 0.2s ease;
      color: ${theme.colors.core.secondary[100]};
      font-weight: 500;
    }

    .icon-variant:hover .copy-btn {
      opacity: 1;
    }

    .copy-btn:hover {
      background: ${theme.colors.core.primary[100]};
      color: #FFFFFF;
      border-color: ${theme.colors.core.primary[120]};
      transform: scale(1.05);
    }

    .copy-btn:active {
      transform: scale(0.95);
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: ${theme.colors.core.secondary[60]};
      display: none;
    }

    .no-results h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${theme.colors.core.secondary[100]};
    }

    html {
      scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.colors.core.tertiary[120]};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.colors.core.primary[120]};
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.colors.core.primary[100]};
    }
  `

  // Vanilla JS for client-side functionality
  const clientScript = `
    const ALL_ICONS = ${iconsJson};
    
    let filteredIcons = ALL_ICONS;
    let currentFilter = 'all';
    let currentSearch = '';

    function groupIconsByBaseName(icons) {
      const groups = {};
      
      icons.forEach(icon => {
        const baseName = icon.name;
        
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
        const availableVariants = [...new Set(variants.map(icon => icon.variant))];
        
        return \`
          <div class="icon-group">
            <div class="variant-badges">
              \${availableVariants.map(variant => \`
                <span class="variant-badge variant-\${variant}">\${variant}</span>
              \`).join('')}
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
  `

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Marshmallow Icons - Simple Viewer</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <div className="header">
          <h1>Marshmallow Icons - Simple Viewer</h1>
          <div className="controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search icons..."
              id="searchInput"
            />
            <div className="filter-buttons">
              <button className="filter-btn active" data-filter="all">
                All
              </button>
              <button className="filter-btn" data-filter="outline">
                Outline
              </button>
              <button className="filter-btn" data-filter="solid">
                Solid
              </button>
              <button className="filter-btn" data-filter="misc">
                Misc
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="stats" id="stats"></div>
          <div className="icon-grid" id="iconGrid"></div>
          <div className="no-results" id="noResults">
            <h3>No icons found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: clientScript }} />
      </body>
    </html>
  )
}
