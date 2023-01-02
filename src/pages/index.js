import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ data}) => (
  <Layout>
    <div>
      <h1>Thoughts by Craig</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <span to={node.fields.slug}>
            <h4>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </h4>
          </span>
          <p>{node.frontmatter.description || node.excerpt}</p>
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage
