import { defaultTheme } from '@vuepress/theme-default'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default {
  title: 'Trc Library Documentation',
  description: 'Documentation for our FTC library',
  head: [
    ['link', { rel: 'icon', href: '/favicon/favicon.png' }],
  ],
  bundler: webpackBundler(),
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
}
