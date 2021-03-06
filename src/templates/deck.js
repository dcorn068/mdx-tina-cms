import { graphql } from "gatsby"

import React from "react"

import ControlsSection from "../components/Controls"
import Deck from "../components/Deck"
import { Wysiwyg } from "@tinacms/fields"
import { TinaField } from "@tinacms/form-builder"
import { inlineRemarkForm } from "gatsby-tinacms-remark"
import styled from "styled-components/macro"

const DeckStyles = styled.div`
  overflow: hidden;
`

function DeckTemplate({
  data,
  location,
  isEditing,
  setIsEditing,
  pageContext,
}) {
  const { slug, title, rawMarkdownBody, html } = pageContext

  // TODO: use this to share links to decks
  // const [value, setValue] = useState(decodeURI(location.search.slice(1))) // slice off the question mark
  // const handleEditorChange = (ev, value) => {
  //   setValue(value)
  //   navigate(`/?${encodeURI(value)}`, { replace: true })
  // }
  // const handlePreview = () => {
  //   navigate(`/deck-preview?${encodeURI(value)}`)
  // }
  const handleBuild = () => {
    console.log("TODO")
  }

  return (
    <DeckStyles>
      <ControlsSection
        handleEdit={() => setIsEditing(p => !p)}
        isEditing={isEditing}
        handleBuild={handleBuild}
      ></ControlsSection>
      {isEditing ? (
        <TinaField name="rawMarkdownBody" Component={Wysiwyg} />
      ) : (
        <Deck
          location={location}
          deckData={data.markdownRemark.rawMarkdownBody}
        />
      )}
    </DeckStyles>
  )
}
// 1. Define the form config
const DeckPageForm = {
  label: "Deck",
  fields: [
    {
      label: "Title",
      name: "frontmatter.title",
      description: "Enter the title of the deck here",
      component: "text",
    },
    {
      label: "Slides",
      name: "rawMarkdownBody",
      description: "Enter the slides content here",
      component: "textarea",
    },
  ],
}

export default inlineRemarkForm(DeckTemplate, DeckPageForm)

export const pageQuery = graphql`
  query DeckBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...TinaRemark
      html
      rawMarkdownBody
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       id
//       excerpt(pruneLength: 160)
//       html
//       ...TinaRemark
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         description
//       }
//     }
//   }
// `
