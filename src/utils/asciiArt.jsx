export const ASCII_TEMPLATES = {
  // Web/Frontend - Perfectly sized for centering
  web: `
   ╭──────────────╮
   │  ┌────────┐  │
   │  │ ░░░░░░ │  │
   │  │ ░░░░░░ │  │
   │  │ 🌐 WEB  │  │
   │  │ ░░░░░░ │  │
   │  └────────┘  │
   ╰──────────────╯
    [__web_dev__]
    `,

  // API/Backend - Server focused
  api: `
    ╭────────────╮
    │  ┌──────┐  │
    │  │ 🖥️    │  │
    │  │ API  │  │
    │  │ 🗃️    │  │
    │  └──────┘  │
    ╰────────────╯
    [__server__]
    `,

  // Mobile App - Phone themed
  app: `
   ╭────────────╮
   │  ┌──────┐  │
   │  │📱     │  │
   │  │APP   │  │
   │  │░░░░  │  │
   │  └──────┘  │
   ╰────────────╯
   [__mobile__]
    `,

  // CLI/Tool - Terminal focused
  tool: `
    ╭────────────╮
    │   ┌────┐   │
    │   │ [] │   │
    │   │ [] │   │
    │   │ [] │   │
    │   └────┘   │
    ╰────────────╯
    [__cli_tool__]
    `,

  // AI/Bot - Robot themed
  bot: `
    ╭────────────╮
    │   [o_o]    │
    │  /|___|\\  │
    │   d   b    │
    │   🤖 AI     │
    ╰────────────╯
     [__ai_bot__]
    `,

  // Data Science/ML - Charts and graphs
  data: `
   ╭────────────╮
   │   📊 DATA   │
   │  ┌──────┐  │
   │  │████░░│  │
   │  │███░░░│  │
   │  │ 📈 ML │  │
   │  └──────┘  │
   ╰────────────╯
   [__data_science__]
    `,

  // DevOps/CI-CD - Pipeline focused
  devops: `
   ╭────────────╮
   │  ⚙️ CI/CD  │
   │  ┌──┐┌──┐  │
   │  │ 🐳│→│🚀│  │
   │  └──┘└──┘  │
   │  ☁️ CLOUD  │
   ╰────────────╯
    [__devops__]
    `,

  // Game Development - Controller themed
  game: `
   ╭────────────╮
   │   🎮 GAME   │
   │  ┌──────┐  │
   │  │░░░░░░│  │
   │  │░░░░░░│  │
   │  │🎮 CTRL│  │
   │  └──────┘  │
   ╰────────────╯
   [__game_dev__]
    `,

  // Library/Package - Book themed
  library: `
   ╭────────────╮
   │   📚 LIB    │
   │  ┌──────┐  │
   │  │░░░░░░│  │
   │  │🧩 MOD │  │
   │  │░░░░░░│  │
   │  └──────┘  │
   ╰────────────╯
   [__library__]
    `,

  // Documentation - Book and paper
  docs: `
   ╭────────────╮
   │   📝 DOCS   │
   │  ┌──────┐  │
   │  │📄     │  │
   │  │📖     │  │
   │  │✅     │  │
   │  └──────┘  │
   ╰────────────╯
     [__docs__]
    `,

  // Security - Lock themed
  security: `
   ╭────────────╮
   │   🔒 SEC    │
   │  ┌──────┐  │
   │  │🔐     │  │
   │  │🛡️     │  │
   │  │✅     │  │
   │  └──────┘  │
   ╰────────────╯
   [__security__]
    `,

  // Blockchain - Chain themed
  blockchain: `
   ╭────────────╮
   │  ⛓️ CHAIN   │
   │  ┌──────┐  │
   │  │[⛓]   │  │
   │  │💰     │  │
   │  │⚡     │  │
   │  └──────┘  │
   ╰────────────╯
   [__blockchain__]
    `,

  // IoT/Embedded - Device themed
  iot: `
   ╭────────────╮
   │   📡 IoT    │
   │  ┌──────┐  │
   │  │📡     │  │
   │  │🖥️     │  │
   │  │🔋     │  │
   │  └──────┘  │
   ╰────────────╯
      [__iot__]
    `,

  // Design/UI - Palette themed
  design: `
   ╭────────────╮
   │  🎨 DESIGN  │
   │  ┌──────┐  │
   │  │🎨     │  │
   │  │🖌️     │  │
   │  │📱     │  │
   │  └──────┘  │
   ╰────────────╯
    [__design__]
    `,

  // Testing/QA - Test tube themed
  testing: `
   ╭────────────╮
   │  🧪 TEST    │
   │  ┌──────┐  │
   │  │✅     │  │
   │  │🧪     │  │
   │  │💯     │  │
   │  └──────┘  │
   ╰────────────╯
   [__testing__]
    `,

  // Default fallback - Clean and simple
  default: `
   ╭────────────╮
   │   📁 CODE   │
   │  ┌──────┐  │
   │  │░░░░░░│  │
   │  │</>   │  │
   │  │░░░░░░│  │
   │  └──────┘  │
   ╰────────────╯
    [__source__]
    `
};

export const getAsciiCover = (repoName, topics = [], languages = []) => {
  const name = repoName.toLowerCase();
  const t = topics.map(t => t.toLowerCase());
  const l = languages.map(lang => lang.toLowerCase());

  // Helper to check if any language matches detecting list
  const hasLang = (list) => list.some(item => l.includes(item));

  // Enhanced heuristics with more categories & language triangulation
  if (
    name.includes('web') || name.includes('front') || name.includes('site') ||
    name.includes('react') || name.includes('vue') || name.includes('angular') ||
    name.includes('next') || name.includes('nuxt') ||
    t.includes('frontend') || t.includes('web') || t.includes('ui') || t.includes('ux') ||
    hasLang(['html', 'css', 'typescript', 'javascript', 'vue', 'svelte', 'scss', 'less', 'handlebars'])
  ) {
    return ASCII_TEMPLATES.web;
  }

  if (
    name.includes('api') || name.includes('back') || name.includes('server') ||
    name.includes('db') || name.includes('database') || name.includes('graphql') ||
    name.includes('rest') || name.includes('microservice') ||
    t.includes('backend') || t.includes('api') || t.includes('server') || t.includes('database') ||
    hasLang(['php', 'java', 'go', 'ruby', 'c#', 'elixir', 'scala', 'perl', 'sql'])
  ) {
    return ASCII_TEMPLATES.api;
  }

  if (
    name.includes('app') || name.includes('mobile') || name.includes('android') ||
    name.includes('ios') || name.includes('flutter') || name.includes('react-native') ||
    name.includes('ionic') || name.includes('cordova') ||
    t.includes('mobile') || t.includes('android') || t.includes('ios') ||
    hasLang(['swift', 'kotlin', 'dart', 'objective-c'])
  ) {
    return ASCII_TEMPLATES.app;
  }

  if (
    name.includes('bot') || name.includes('ai') || name.includes('gpt') ||
    name.includes('intelligence') || name.includes('ml') || name.includes('machine') ||
    name.includes('deep') || name.includes('neural') || name.includes('chatbot') ||
    name.includes('llm') ||
    t.includes('ai') || t.includes('machine-learning') || t.includes('deep-learning') || t.includes('bot') ||
    hasLang(['python', 'jupyter notebook']) && (name.includes('gpt') || name.includes('bot') || name.includes('ai')) // Refining python context
  ) {
    return ASCII_TEMPLATES.bot;
  }

  if (
    name.includes('data') || name.includes('science') || name.includes('ml') ||
    name.includes('tensorflow') || name.includes('pytorch') || name.includes('pandas') ||
    name.includes('numpy') || name.includes('analysis') || name.includes('analytics') ||
    t.includes('data-science') || t.includes('machine-learning') || t.includes('analytics') || t.includes('data') ||
    hasLang(['python', 'r', 'jupyter notebook', 'matlab'])
  ) {
    return ASCII_TEMPLATES.data;
  }

  if (
    name.includes('tool') || name.includes('cli') || name.includes('command') ||
    name.includes('script') || name.includes('util') || name.includes('utility') ||
    name.includes('generator') || name.includes('boilerplate') ||
    t.includes('cli') || t.includes('tool') || t.includes('utility') ||
    hasLang(['shell', 'bash', 'powershell', 'makefile', 'batchfile'])
  ) {
    return ASCII_TEMPLATES.tool;
  }

  if (
    name.includes('devops') || name.includes('ops') || name.includes('docker') ||
    name.includes('kubernetes') || name.includes('k8s') || name.includes('ci') ||
    name.includes('cd') || name.includes('pipeline') || name.includes('deployment') ||
    name.includes('aws') || name.includes('azure') || name.includes('gcp') || name.includes('cloud') ||
    t.includes('devops') || t.includes('infrastructure') || t.includes('docker') || t.includes('kubernetes') || t.includes('cloud') ||
    hasLang(['hcl', 'dockerfile', 'yaml', 'terraform'])
  ) {
    return ASCII_TEMPLATES.devops;
  }

  if (
    name.includes('game') || name.includes('gaming') || name.includes('unity') ||
    name.includes('unreal') || name.includes('godot') || name.includes('engine') ||
    t.includes('game-dev') || t.includes('game') || t.includes('gaming') ||
    hasLang(['hlsl', 'glsl', 'shaderlab', 'gdscript', 'lua'])
  ) {
    return ASCII_TEMPLATES.game;
  }

  if (
    name.includes('lib') || name.includes('library') || name.includes('package') ||
    name.includes('npm') || name.includes('yarn') || name.includes('sdk') ||
    name.includes('framework') || name.includes('module') ||
    t.includes('library') || t.includes('package') || t.includes('sdk') || t.includes('framework')
  ) {
    return ASCII_TEMPLATES.library;
  }

  if (
    name.includes('doc') || name.includes('docs') || name.includes('documentation') ||
    name.includes('readme') || name.includes('guide') || name.includes('tutorial') ||
    name.includes('manual') ||
    t.includes('documentation') || t.includes('docs') || t.includes('tutorial')
  ) {
    return ASCII_TEMPLATES.docs;
  }

  if (
    name.includes('security') || name.includes('sec') || name.includes('crypto') ||
    name.includes('encryption') || name.includes('auth') || name.includes('authentication') ||
    name.includes('ssl') || name.includes('tls') || name.includes('vulnerability') ||
    t.includes('security') || t.includes('encryption') || t.includes('authentication')
  ) {
    return ASCII_TEMPLATES.security;
  }

  if (
    name.includes('blockchain') || name.includes('crypto') || name.includes('web3') ||
    name.includes('ethereum') || name.includes('bitcoin') || name.includes('smart') ||
    name.includes('contract') || name.includes('nft') || name.includes('defi') ||
    t.includes('blockchain') || t.includes('cryptocurrency') || t.includes('web3') ||
    hasLang(['solidity', 'vyper'])
  ) {
    return ASCII_TEMPLATES.blockchain;
  }

  if (
    name.includes('iot') || name.includes('embedded') || name.includes('hardware') ||
    name.includes('arduino') || name.includes('raspberry') || name.includes('sensor') ||
    name.includes('microcontroller') || name.includes('firmware') ||
    t.includes('iot') || t.includes('embedded') || t.includes('hardware') ||
    hasLang(['verilog', 'vhdl', 'assembly', 'c', 'c++'])
  ) {
    return ASCII_TEMPLATES.iot;
  }

  if (
    name.includes('design') || name.includes('ui') || name.includes('ux') ||
    name.includes('figma') || name.includes('sketch') || name.includes('adobe') ||
    name.includes('prototype') || name.includes('wireframe') || name.includes('design-system') ||
    t.includes('design') || t.includes('ui') || t.includes('ux')
  ) {
    return ASCII_TEMPLATES.design;
  }

  if (
    name.includes('test') || name.includes('testing') || name.includes('qa') ||
    name.includes('quality') || name.includes('jest') || name.includes('mocha') ||
    name.includes('cypress') || name.includes('selenium') || name.includes('pytest') ||
    t.includes('testing') || t.includes('qa') || t.includes('quality-assurance')
  ) {
    return ASCII_TEMPLATES.testing;
  }

  return ASCII_TEMPLATES.default;
};