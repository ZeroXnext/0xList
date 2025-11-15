export function slugify(str: string): string {
  return str
      .normalize("NFD")                 // decompose accents/diacritics
      .replace(/[\u0300-\u036f]/g, '')  // remove the accents
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')          // spaces/underscores → hyphens
      .replace(/[^\w-]+/g, '')          // remove non-alphanumeric except hyphen
      .replace(/--+/g, '-')             // collapse multiple hyphens
      .replace(/^-+|-+$/g, '');         // remove leading/trailing hyphens
}

export function timestamp() {
  return new Date().toISOString();
}

export function parseGitRemoteUrl(url: string): { username: string; repo: string } {
  // Remove trailing whitespace
  url = url.trim();

  // Match the username and repo for SSH or HTTPS URLs
  const match = url.match(/[:/](.+?)\/(.+?)(\.git)?$/);

  if (!match) {
    throw new Error(`Cannot parse Git remote URL: ${url}`);
  }

  const [, username, repo] = match;
  return {username, repo};
}
