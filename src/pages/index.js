import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const Title = styled.h1`
  display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  &:hover {
    color: #1dcaff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

const IndexPage = ({ data }) => (
  <Layout>
    <div>
      <Title>Thoughts by Craig</Title>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogBody key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </BlogTitle>
          </BlogLink>
          <p>{node.frontmatter.description || node.excerpt}</p>
        </BlogBody>
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
