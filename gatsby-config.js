'use strict'

module.exports = {
  siteMetadata: {
    title: 'ideal MRI - Schedule Now',
    description: 'High quality, low cost MRI scans. Fast and convenient. Schedule online now.',
    siteUrl: 'https://schedule.idealmri.com',
    author: {
      name: 'Ben Herila',
      url: 'https://www.bherila.net',
      email: 'ben@herila.net'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
              pixelId: '783520752000386',
            },
          },
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://schedule.idealmri.com'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
