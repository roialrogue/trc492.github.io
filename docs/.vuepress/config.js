import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import container from '@vuepress/plugin-container'

export default defineUserConfig({
  title: 'TrcLib Documentation',
  description: 'Documentation for the Titan Robotics Framework library',
  base: '/trc492.github.io/',//This should be '/' when hosted on a non forked repo
  head: [
    ['link', { rel: 'icon', href: '/favicon/favicon.png' }],
  ],
  bundler: viteBundler(),
  theme: defaultTheme({
    logo: '/assets/logo.png',
    sidebar: {
      '/': [
        {
          text: 'What is TrcLib?',
          link: '/',
          collapsible: false,
        },
        {
          text: 'Before You Begin',
          link: '/before-you-begin',
          collapsible: false,
        },
        {
          text: 'Installing',
          link: '/installing',
          collapsible: false,
        },
        {
          text: 'Github',
          link: '/github-basics',
          collapsible: false,
        },
        {
          text: 'FtcTemplate Structure',
          link: '/template-structure',
          collapsible: false,
        },
        {
          text: 'Creating Subsystems',
          link: '/creating-subsystems',
          collapsible: false,
        }
      ],
    },
    sidebarDepth: 2, //This auto shows ## and ### headers
    repo: 'trc492/FtcTemplate',
    docsDir: 'docs',
    lastUpdatedText: 'Last Updated',
    editLink: false,
    searchPlaceholder: 'Search...',
  }),

  plugins: [
    container({
      type: 'files',
      before: () => '<pre class="files">',
      after: () => '</pre>',
    }),
  ],
})
