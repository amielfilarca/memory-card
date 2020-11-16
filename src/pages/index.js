import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { AnimatePresence, motion } from "framer-motion"

import Layout from "../components/layout"
import SEO from "../components/seo"
import cardsData from "../data/cardsData"
import styles from "./index.module.css"

const IndexPage = () => {
  // Get card images from graphql
  const data = useStaticQuery(graphql`
    {
      image: allFile(filter: { relativeDirectory: { eq: "cards" } }) {
        edges {
          node {
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  // Set images from graphql in cardsData
  cardsData.forEach(card => {
    data.image.edges.forEach(edge => {
      if (edge.node.name === `Artifact_${card.name.replaceAll(" ", "_")}`) {
        card.image = edge.node.childImageSharp.fluid
      }
    })
  })

  // Fisher-Yates shuffle
  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const [cards, setCards] = useState(cardsData)
  const [options, setOptions] = useState(shuffle([...cards]).slice(0, 3))
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const cardClickHandler = id => {
    const clickedCard = cards.find(card => card.id === id)
    if (clickedCard.isClicked) {
      // End
      // Evaluate score
      if (score > highScore) {
        setHighScore(score)
      }
      // Reset score
      setScore(0)
      // Reset cards
      setCards([
        ...cards.map(card => {
          card.isClicked = false
          return card
        }),
      ])
      // Reset options
      setOptions(
        shuffle([...cards].filter(card => !options.includes(card))).slice(0, 3)
      )
    } else {
      // Continue
      setOptions(null)
      // Increase score
      setScore(score + 1)
      // Set card as clicked
      setCards([
        ...cards.map(card => {
          if (card.id === id) {
            card.isClicked = true
          }
          return card
        }),
      ])
      // Get unclicked cards
      const unclickedCards = [...cards.filter(card => card.isClicked === false)]

      // End if there is no unclicked cards left
      if (unclickedCards.length === 0) {
        // End
        // Evaluate score
        setHighScore(cards.length)
        // Reset score
        setScore(0)
        // Reset cards
        setCards([
          ...cards.map(card => {
            card.isClicked = false
            return card
          }),
        ])
        // Reset options
        setOptions(shuffle([...cards]).slice(0, 3))
      } else {
        // Change options
        const validCard = shuffle(
          unclickedCards.filter(card => !options.includes(card))
        )[0]
        const newOptions = [
          validCard,
          ...shuffle(
            cards.filter(
              card => card.id !== validCard.id && !options.includes(card)
            )
          ).slice(0, 2),
        ]
        setOptions(shuffle([...newOptions]))
      }
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100vw" }}
        >
          <div className={styles.stats}>
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
            <div>Max Score: 39</div>
          </div>
          <div className={styles.gridContainer}>
            {options &&
              options.map(card => (
                <motion.div
                  className={styles.card}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: (options.indexOf(card) / 1) * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cardClickHandler(card.id)}
                  key={card.id}
                >
                  <Img fluid={card.image} alt={card.name} />
                </motion.div>
              ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default IndexPage
