import React from "react"
import { DocsThemeConfig } from "nextra-theme-docs"

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>tscircuit</span>
  ),
  project: {
    link: "https://github.com/tscircuit/tscircuit",
  },
  docsRepositoryBase: "https://github.com/tscircuit/docs-old",
  footer: {
    text: "tscircuit docs",
  },
  primaryHue: 212,
  useNextSeoProps() {
    return {
      titleTemplate: "%s – tscircuit",
    }
  },
  // Properly center content like Bun docs
  main: ({ children }) =>
    React.createElement(
      "div",
      {
        style: {
          maxWidth: "768px",
          margin: "0 auto",
          width: "100%",
          padding: "0 1rem",
        },
      },
      children
    ),
}

export default config
