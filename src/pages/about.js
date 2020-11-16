import React from "react"
import { motion, AnimatePresence } from "framer-motion"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./about.module.css"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: "100vw" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100vw" }}
        className={styles.container}
      >
        <h1 className={styles.h1}>About</h1>
        <p className={styles.p}>
          Developed by Amiel Filarca as part of his web development learning
          experience.
        </p>
        <h1 className={styles.h1}>How to Play</h1>
        <p className={styles.p}>
          This application puts your memory to the test. You are presented with
          multiple artifact cards. The cards get shuffled every time they are
          clicked. You <strong>CAN NOT</strong> click on any card more than once
          or else your score resets to zero. The main objective is to get the
          highest score as possible.
        </p>
        <h1 className={styles.h1}>Credits</h1>
        <p className={styles.p}>
          All images are © Valve Corporation, all rights reserved.
        </p>
      </motion.div>
    </AnimatePresence>
  </Layout>
)

export default AboutPage
