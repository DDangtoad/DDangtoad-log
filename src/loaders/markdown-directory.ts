import { promises as fs } from "node:fs";
import { relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { Loader } from "astro/loaders";

const supportedExtensions = new Set([".md", ".mdx"]);

async function listContentFiles(directory: URL): Promise<URL[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const url = new URL(entry.name, directory);
      if (entry.isDirectory()) {
        url.pathname += "/";
        return listContentFiles(url);
      }
      return supportedExtensions.has(`.${entry.name.split(".").at(-1)}`) ? [url] : [];
    }),
  );
  return files.flat();
}

export function markdownDirectory(base: string): Loader {
  return {
    name: "markdown-directory",
    async load({ config, generateDigest, parseData, renderMarkdown, store }) {
      const baseUrl = new URL(base.endsWith("/") ? base : `${base}/`, config.root);
      const rootPath = fileURLToPath(config.root);
      const basePath = fileURLToPath(baseUrl);
      const files = await listContentFiles(baseUrl);
      store.clear();
      for (const fileUrl of files) {
        const contents = await fs.readFile(fileUrl, "utf8");
        const relativeEntry = relative(basePath, fileURLToPath(fileUrl)).replaceAll("\\", "/");
        const id = relativeEntry.replace(/\.(md|mdx)$/i, "");
        const filePath = relative(rootPath, fileURLToPath(fileUrl)).replaceAll("\\", "/");
        const digest = generateDigest(contents);
        const rendered = await renderMarkdown(contents, { fileURL: fileUrl });
        const data = rendered.metadata?.frontmatter ?? {};
        const parsedData = await parseData({ id, data, filePath });
        store.set({ id, data: parsedData, body: contents, filePath, digest, rendered });
      }
    },
  };
}
