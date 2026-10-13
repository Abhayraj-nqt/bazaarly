export const SITE_CONFIG = {
  name: "application name",
  url: "http://localhost:3000",
  logo: "application-logo-url",
  ogImage: "og image url",
  description: "application description",
  date: "23 Jan 2026", // Project date
  keywords: ["site", "keywords"],
  contact: {
    phone: "+12537392735",
  },
  social: {
    facebook: "facebook url",
    instagram: "instagram url",
    x: "twitter url (now called 'x')",
    linkedIn: "linked url",

    handle: {
      x: "x (twitter) handle",
    },
  },
  address: {
    country: "United State",
    state: "Arizona",
    postalCode: "85001",
    streetAddress: "",
    locality: "",
    latitude: 33.6409799,
    longitude: -111.9833157,
  },
} as const;
