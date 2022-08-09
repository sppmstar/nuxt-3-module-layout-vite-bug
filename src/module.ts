import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addTemplate, addLayout } from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule'
  },
  defaults: {
    addPlugin: true
  },
  setup (options, nuxt) {
    if (options.addPlugin) {
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))

      const layoutsDir = fileURLToPath(new URL('./layouts', import.meta.url))
      const tpl = addTemplate({ src: resolve(layoutsDir, 'custom-layout.vue'), write: true })
      addLayout(tpl, 'custom')
    }
  }
})
