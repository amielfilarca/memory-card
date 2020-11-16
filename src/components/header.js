import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styles from "./header.module.css"

const Header = ({ siteTitle }) => (
  <header className={styles.header}>
    <div className={styles.headerContent}>
      <Link className={styles.logo} to="/">
        {siteTitle}
      </Link>
      <nav className={styles.nav}>
        <Link className={styles.navLink} to="/">
          Home
        </Link>
        <Link className={styles.navLink} to="/about">
          About
        </Link>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
