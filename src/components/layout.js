/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      bg: file(relativePath: { eq: "bg.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1440, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageData = data.bg.childImageSharp.fluid

  return (
    <BackgroundImage
      className="bgImage"
      fluid={imageData}
      backgroundColor={`#040e18`}
    >
      <div className="container">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <main>{children}</main>
        <footer>&copy; 2020 Amiel Filarca</footer>
      </div>
    </BackgroundImage>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
