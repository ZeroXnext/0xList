export function parseGitRemoteUrl(url: string): {
  username: string;
  repo: string;
} {
  // Remove trailing whitespace
  url = url.trim();

  // Match the username and repo for SSH or HTTPS URLs
  const match = url.match(/[:/](.+?)\/(.+?)(\.git)?$/);

  if (!match) {
    throw new Error(`Cannot parse Git remote URL: ${url}`);
  }

  const [, username, repo] = match;
  return { username, repo };
}
