import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    // Register web components only in browser (not during SSR)
    if (!import.meta.env.SSR) {
      // Dynamically import simulators
      await import('../../../components/simulator-base.js')
      await import('../../../components/paradox-card.js')

      // Import all simulators
      const simulatorModules = import.meta.glob('../../../components/simulators/*.js')
      for (const path in simulatorModules) {
        simulatorModules[path]()
      }
    }
  }
} satisfies Theme
