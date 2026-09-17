import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Vendored sub-apps (intrasight/, intrasight-distant-future/) keep their own
// "src/assets" folder. Walk up from the importing file to find the nearest
// "assets" directory before falling back to the main app's src/assets.
function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string, importer?: string) {
      if (!id.startsWith('figma:asset/')) return null
      const filename = id.replace('figma:asset/', '')

      if (importer) {
        let dir = path.dirname(importer)
        for (let i = 0; i < 8; i++) {
          const candidate = path.join(dir, 'assets', filename)
          if (fs.existsSync(candidate)) return candidate
          const parent = path.dirname(dir)
          if (parent === dir) break
          dir = parent
        }
      }

      return path.resolve(__dirname, 'src/assets', filename)
    },
  }
}

// The vendored sub-apps' Figma-exported source imports packages with a
// version suffix baked into the specifier (e.g. "lucide-react@0.487.0",
// "@radix-ui/react-accordion@1.2.3"). Strip the version and resolve the bare
// package name from this project's node_modules instead of maintaining a
// manual alias list per package.
function versionedPackageResolver() {
  return {
    name: 'strip-versioned-imports',
    async resolveId(id: string, importer?: string, options?: object) {
      const match = id.match(/^(@[^/]+\/[^@]+|[^@]+)@\d[\d.]*$/)
      if (!match) return null
      return this.resolve(match[1], importer, { ...options, skipSelf: true })
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    versionedPackageResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
      // Vendored Intrasight sub-apps, rendered directly (no iframe)
      '@intrasight': path.resolve(__dirname, 'intrasight/src'),
      '@intrasight-distant-future': path.resolve(__dirname, 'intrasight-distant-future/src'),
      // Force a single React instance across the main app and the vendored
      // sub-apps (which otherwise resolve their own nested node_modules copy)
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

