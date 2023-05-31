export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "HostShare Demo",
  description:
    "Demo where Dax looses his mind trying to cram it all in.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search",
      href: "/search"
    },
    {
      title: "Justifications",
      href: "/justification"
    }

  ],
  links: {
    twitter: "https://twitter.com/HaydenAylor",
    github: "https://github.com/dax911",
  },
}
