import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBasePath =
  process.env.GITHUB_PAGES_BASE_PATH ??
  (repositoryName ? `/${repositoryName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? githubPagesBasePath : "",
  },
  ...(isGitHubPages && githubPagesBasePath
    ? {
        assetPrefix: githubPagesBasePath,
        basePath: githubPagesBasePath,
      }
    : {}),
};

export default nextConfig;
