import { defineConfig } from 'vitepress'
import { paradoxSidebar } from './sidebar.generated.mts'

export default defineConfig({
  title: 'Paradox Explorer',
  description: 'Interactive Paradox Simulators',

  // GitHub Pages deployment
  base: '/paradox-book/',

  head: [
    ['link', { rel: 'icon', href: '/paradox-book/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'All Paradoxes', link: '/paradoxes/' },
      { text: 'By Points', link: '/by-points' }
    ],

    sidebar: {
      '/paradoxes/': paradoxSidebar
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ]
  },

  vite: {
    // Allow importing web components
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-simulator') || tag === 'paradox-card'
        }
      }
    }
  },

  // Ignore dead links for now during migration
  ignoreDeadLinks: true
})
