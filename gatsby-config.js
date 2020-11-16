module.exports = {
  pathPrefix: "/memory-card",
  siteMetadata: {
    title: `Memory Card`,
    description: `This application puts your memory to the test. You are presented with multiple artifact cards. The cards get shuffled everytime they are clicked. You CAN NOT click on any card more than once or else your score resets to zero. The main objective is to get the highest score as possible.`,
    author: `Amiel Filarca`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cards`,
        path: `${__dirname}/src/images/cards`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
