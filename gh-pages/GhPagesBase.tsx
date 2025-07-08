import { theme } from '../src/theme'
import type { Icon } from './generateGhPages'

interface GhPagesBaseProps {
  icons: Icon[]
}

// generates static HTML for GitHub Pages with embedded vanilla JS
export function GhPagesBase({ icons }: GhPagesBaseProps) {
  const iconsJson = JSON.stringify(icons, null, 2)

  const styles = generateStyles()
  const clientScript = generateClientScript(iconsJson)

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Browse and search Marshmallow Icons collection"
        />
        <title>Marshmallow Icons</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <header className="header" role="banner">
          <h1>Marshmallow Icons</h1>
          <div className="controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search icons..."
              id="searchInput"
              aria-label="Search icons"
            />
            <div
              className="filter-buttons"
              role="group"
              aria-label="Filter icons by variant"
            >
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
        </header>

        <main className="container">
          <div className="stats" id="stats" aria-live="polite"></div>
          <div className="icon-grid" id="iconGrid" role="grid"></div>
          <div className="no-results" id="noResults">
            <h3>No icons found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        </main>

        <script dangerouslySetInnerHTML={{ __html: clientScript }} />
      </body>
    </html>
  )
}

function generateStyles(): string {
  const spacing = {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '4rem',
  }

  const borderRadius = {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
  }

  return `
    /* Reset and Base Styles */
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
      line-height: 1.5;
    }

    /* Header Styles */
    .header {
      background: ${theme.colors.core.tertiary[0]};
      border-bottom: 1px solid ${theme.colors.core.secondary[40]};
      padding: ${spacing['2xl']} ${spacing['3xl']};
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(10px);
    }

    .header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: ${spacing.xl};
      color: ${theme.colors.core.primary[120]};
    }

    /* Controls Section */
    .controls {
      display: flex;
      gap: ${spacing.xl};
      flex-wrap: wrap;
      align-items: center;
    }

    .search-input {
      flex: 1;
      min-width: 300px;
      padding: ${spacing.lg} ${spacing.xl};
      border: 1px solid ${theme.colors.core.secondary[40]};
      border-radius: ${borderRadius.md};
      font-size: 1rem;
      background: ${theme.colors.core.tertiary[0]};
      color: ${theme.colors.core.secondary[120]};
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: ${theme.colors.core.primary[120]};
      box-shadow: 0 0 0 3px ${theme.colors.core.primary[120]}33;
    }

    .search-input::placeholder {
      color: ${theme.colors.core.secondary[60]};
    }

    /* Filter Buttons */
    .filter-buttons {
      display: flex;
      gap: ${spacing.md};
    }

    .filter-btn {
      padding: ${spacing.md} ${spacing.xl};
      border: 1px solid ${theme.colors.core.secondary[40]};
      background: ${theme.colors.core.tertiary[0]};
      border-radius: ${borderRadius.sm};
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: ${theme.colors.core.secondary[100]};
      transition: all 0.2s ease;
      white-space: nowrap;
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

    /* Main Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: ${spacing['3xl']};
    }

    .stats {
      text-align: center;
      margin-bottom: ${spacing['3xl']};
      color: ${theme.colors.core.secondary[60]};
      font-weight: 500;
      font-size: 0.875rem;
    }

    /* Icon Grid Layout */
    .icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: ${spacing['2xl']};
    }

    /* Icon Group Card */
    .icon-group {
      background: ${theme.colors.core.tertiary[0]};
      border: 1px solid ${theme.colors.core.tertiary[120]};
      border-radius: ${borderRadius.lg};
      padding: ${spacing['2xl']};
      transition: all 0.3s ease;
    }

    .icon-group:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    /* Variant Badges */
    .variant-badges {
      display: flex;
      gap: ${spacing.sm};
      flex-wrap: wrap;
      margin-bottom: ${spacing.xl};
    }

    .variant-badge {
      font-size: 0.625rem;
      padding: ${spacing.xs} ${spacing.md};
      border-radius: ${borderRadius.sm};
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

    /* Icon Variants List */
    .icon-variants {
      display: flex;
      flex-direction: column;
      gap: ${spacing.lg};
    }

    .icon-variant {
      display: flex;
      align-items: center;
      gap: ${spacing.lg};
      padding: ${spacing.lg};
      border-radius: ${borderRadius.md};
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }

    .icon-variant:hover {
      background: ${theme.colors.core.tertiary[60]};
      border-color: ${theme.colors.core.tertiary[120]};
    }

    /* Icon Display */
    .icon-display {
      width: 28px;
      height: 28px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${borderRadius.sm};
      padding: ${spacing.xs};
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

    /* Icon Name */
    .icon-name {
      flex: 1;
      font-size: 0.875rem;
      color: ${theme.colors.core.secondary[60]};
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
      font-weight: 500;
    }

    /* Copy Button */
    .copy-btn {
      opacity: 0;
      padding: ${spacing.sm} ${spacing.lg};
      font-size: 0.75rem;
      background: ${theme.colors.core.tertiary[120]};
      border: 1px solid ${theme.colors.core.primary[40]};
      border-radius: ${borderRadius.sm};
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

    .copy-btn.copied {
      background: #22c55e;
      color: #FFFFFF;
      border-color: #22c55e;
    }

    /* No Results State */
    .no-results {
      text-align: center;
      padding: ${spacing['4xl']} ${spacing['3xl']};
      color: ${theme.colors.core.secondary[60]};
      display: none;
    }

    .no-results h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: ${spacing.md};
      color: ${theme.colors.core.secondary[100]};
    }

    /* Scrollbar Customization */
    html {
      scroll-behavior: smooth;
    }

    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
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

    /* Responsive Design */
    @media (max-width: 768px) {
      .header {
        padding: ${spacing.xl} ${spacing.xl};
      }
      
      .container {
        padding: ${spacing.xl};
      }
      
      .search-input {
        min-width: 100%;
      }
      
      .icon-grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: ${spacing.xl};
      }
    }
  `
}

function generateClientScript(iconsJson: string): string {
  return `
    // Icon data and state management
    const IconManager = {
      allIcons: ${iconsJson},
      filteredIcons: [],
      currentFilter: 'all',
      currentSearch: '',
      
      // Initialize the icon manager
      init() {
        this.filteredIcons = this.allIcons;
        this.setupEventListeners();
        this.render();
      },
      
      // Group icons by their base name
      groupIconsByBaseName(icons) {
        const groups = {};
        
        icons.forEach(icon => {
          const baseName = icon.name;
          if (!groups[baseName]) {
            groups[baseName] = [];
          }
          groups[baseName].push(icon);
        });

        // Sort variants within each group
        const variantOrder = { outline: 0, solid: 1, misc: 2 };
        Object.values(groups).forEach(group => {
          group.sort((a, b) => variantOrder[a.variant] - variantOrder[b.variant]);
        });

        return groups;
      },
      
      // Filter icons based on search and variant filter
      filterIcons() {
        const searchTerm = this.currentSearch.toLowerCase();
        
        this.filteredIcons = this.allIcons.filter(icon => {
          const matchesSearch = !searchTerm || 
                              icon.name.toLowerCase().includes(searchTerm);
          const matchesFilter = this.currentFilter === 'all' || 
                              icon.variant === this.currentFilter;
          
          return matchesSearch && matchesFilter;
        });

        this.render();
      },
      
      // Render the filtered icons
      render() {
        const grid = document.getElementById('iconGrid');
        const noResults = document.getElementById('noResults');
        const stats = document.getElementById('stats');
        
        if (this.filteredIcons.length === 0) {
          grid.style.display = 'none';
          stats.style.display = 'none';
          noResults.style.display = 'block';
          return;
        }

        const groups = this.groupIconsByBaseName(this.filteredIcons);
        const groupNames = Object.keys(groups).sort();

        grid.style.display = 'grid';
        stats.style.display = 'block';
        noResults.style.display = 'none';

        // Generate HTML for icon groups
        grid.innerHTML = groupNames.map(baseName => 
          this.createIconGroupHTML(baseName, groups[baseName])
        ).join('');
        
        this.updateStats(groupNames.length);
      },
      
      // Create HTML for a single icon group
      createIconGroupHTML(baseName, variants) {
        const availableVariants = [...new Set(variants.map(icon => icon.variant))];
        
        return \`
          <div class="icon-group">
            <div class="variant-badges">
              \${availableVariants.map(variant => 
                \`<span class="variant-badge variant-\${variant}">\${variant}</span>\`
              ).join('')}
            </div>
            <div class="icon-variants">
              \${variants.map(icon => this.createIconVariantHTML(icon)).join('')}
            </div>
          </div>
        \`;
      },
      
      // Create HTML for a single icon variant
      createIconVariantHTML(icon) {
        // Escape the icon name for safe use in onclick attribute
        const escapedName = icon.name.replace(/'/g, "\\\\'");
        
        return \`
          <div class="icon-variant">
            <div class="icon-display">
              \${icon.svgContent}
            </div>
            <div class="icon-name">\${icon.name}</div>
            <button class="copy-btn" onclick="IconManager.copyToClipboard('\${escapedName}', this)">
              Copy
            </button>
          </div>
        \`;
      },
      
      // Update statistics display
      updateStats(groupCount) {
        const stats = document.getElementById('stats');
        const total = this.allIcons.length;
        const visible = this.filteredIcons.length;
        
        stats.textContent = \`Showing \${visible} of \${total} icons in \${groupCount} groups\`;
      },
      
      // Copy icon name to clipboard
      async copyToClipboard(iconName, button) {
        try {
          await navigator.clipboard.writeText(iconName);
          
          // Visual feedback
          button.textContent = 'Copied!';
          button.classList.add('copied');
          
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
          
        } catch (err) {
          console.error('Failed to copy:', err);
          button.textContent = 'Failed';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }
      },
      
      // Setup event listeners
      setupEventListeners() {
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
          this.currentSearch = e.target.value;
          this.filterIcons();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => 
              b.classList.remove('active')
            );
            e.target.classList.add('active');
            
            // Apply filter
            this.currentFilter = e.target.dataset.filter;
            this.filterIcons();
          });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (e.key === '/' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
          }
        });
      }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => IconManager.init());
    } else {
      IconManager.init();
    }
  `
}
