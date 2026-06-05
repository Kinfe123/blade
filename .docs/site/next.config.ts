import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { withDocs } from "@farming-labs/next/config";

const appDir = dirname(fileURLToPath(import.meta.url));

export default withDocs({
  turbopack: {
    root: appDir,
  },
});
