export const GITHUB_ORG = "bufferring";
export const REPO_COUNT = 3;
export const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const CACHE_KEYS = {
  GITHUB_REPOS: 'github_repos_cache',
  GITHUB_ACTIVITY: 'github_activity_cache',
};

export const API_ENDPOINTS = {
  GITHUB_ORG_REPOS: (org, count) => 
    `https://api.github.com/orgs/${org}/repos?sort=created&direction=desc&per_page=${count}`,
  GITHUB_USER_REPOS: (username) => 
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
  GITHUB_COMMITS: (username, repo) => 
    `https://api.github.com/repos/${username}/${repo}/commits?per_page=100`,
  FORM_SUBMIT: "https://formsubmit.co/ajax/bufferring7@gmail.com",
};

export const TEAM_MEMBERS = [
  // Frontend
  'PotOfCode', 'Yumesitahack', 'AlfonzoPro', 'P13tr04', 'onweb-kym',
  // Backend
  'MrTanuk', 'zayas1234', 'Ailya45', 'Velangel', 'Hades-dev-code', 'GrandR4', 'WolveJC',
  // AI
  'Ray-Phamton', 'ImMau14', 'Theyobii', 'santcodex'
];
