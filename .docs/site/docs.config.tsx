import { defineDocs } from "@farming-labs/docs";
import { colorful } from "@farming-labs/theme/colorful";

export default defineDocs({
  entry: "docs",
  theme: colorful(),
  ordering: [
    {
      "slug": "quickstart"
    },
    {
      "slug": "installation"
    },
    {
      "slug": "configuration",
      "children": [
        {
          "slug": "deployment"
        }
      ]
    },
    {
      "slug": "pages",
      "children": [
        {
          "slug": "pages"
        },
        {
          "slug": "hooks"
        },
        {
          "slug": "api-routes"
        }
      ]
    }
  ],
  metadata: {
    titleTemplate: "%s – Docs",
    description: "Managed by @farming-labs/docs Cloud",
  },
});
