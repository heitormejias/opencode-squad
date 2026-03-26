export const locales = {
  'en': {
    help: {
      init: 'Initialize OpenCode Squad in project',
      update: 'Update core or a specific skill',
      list: 'List all squads',
      create: 'Create a new squad',
      run: 'Run a squad',
      skills: 'Manage skills',
      agents: 'Manage agents',
      runs: 'View execution history',
      dashboard: 'Generate virtual office dashboard',
      locale: 'Change language'
    },
    errors: {
      missingSkillName: 'Error: Please specify a skill name',
      missingAgentName: 'Error: Please specify an agent name',
      missingSquadName: 'Error: Please specify a squad name'
    },
    locale: {
      changed: 'Language changed to {locale}',
      current: 'Current language: {locale}'
    },
    init: {
      success: 'OpenCode Squad initialized successfully!',
      creating: 'Creating project structure...',
      copying: 'Copying templates...'
    },
    squads: {
      noneFound: 'No squads found.',
      found: 'Found {count} squad(s):',
      notInitialized: 'Squads directory not found.',
      runInit: 'Run: opencode-squad init'
    },
    skills: {
      installed: 'Installed Skills:',
      available: 'Available Skills:',
      installSuccess: 'Skill "{name}" installed successfully!',
      uninstallSuccess: 'Skill "{name}" uninstalled successfully!',
      notFound: 'Skill "{name}" not found.'
    },
    agents: {
      installed: 'Installed Agents:',
      available: 'Available Agents:',
      installSuccess: 'Agent "{name}" installed successfully!',
      uninstallSuccess: 'Agent "{name}" uninstalled successfully!',
      notFound: 'Agent "{name}" not found.'
    },
    dashboard: {
      generating: 'Generating dashboard...',
      serve: 'Serve with: npx serve {squad}'
    },
    menu: {
      title: '╔══════════════════════════════════════╗',
      titleLine: '║       OpenCode Squad Menu         ║',
      separator: '╠══════════════════════════════════════╣',
      end: '╚══════════════════════════════════════╝',
      create: 'Create new squad',
      run: 'Run existing squad',
      list: 'List all squads',
      edit: 'Edit squad',
      skills: 'Manage skills',
      agents: 'Manage agents',
      runs: 'View runs',
      dashboard: 'Generate dashboard',
      exit: 'Exit'
    }
  },
  'pt-BR': {
    help: {
      init: 'Inicializar OpenCode Squad no projeto',
      update: 'Atualizar core ou uma skill específica',
      list: 'Listar todos os squads',
      create: 'Criar um novo squad',
      run: 'Executar um squad',
      skills: 'Gerenciar skills',
      agents: 'Gerenciar agentes',
      runs: 'Ver histórico de execuções',
      dashboard: 'Gerar dashboard do escritório virtual',
      locale: 'Mudar idioma'
    },
    errors: {
      missingSkillName: 'Erro: Especifique o nome da skill',
      missingAgentName: 'Erro: Especifique o nome do agente',
      missingSquadName: 'Erro: Especifique o nome do squad'
    },
    locale: {
      changed: 'Idioma alterado para {locale}',
      current: 'Idioma atual: {locale}'
    },
    init: {
      success: 'OpenCode Squad inicializado com sucesso!',
      creating: 'Criando estrutura do projeto...',
      copying: 'Copiando templates...'
    },
    squads: {
      noneFound: 'Nenhum squad encontrado.',
      found: 'Encontrado(s) {count} squad(s):',
      notInitialized: 'Diretório de squads não encontrado.',
      runInit: 'Execute: opencode-squad init'
    },
    skills: {
      installed: 'Skills Instaladas:',
      available: 'Skills Disponíveis:',
      installSuccess: 'Skill "{name}" instalada com sucesso!',
      uninstallSuccess: 'Skill "{name}" desinstalada com sucesso!',
      notFound: 'Skill "{name}" não encontrada.'
    },
    agents: {
      installed: 'Agentes Instalados:',
      available: 'Agentes Disponíveis:',
      installSuccess: 'Agente "{name}" instalado com sucesso!',
      uninstallSuccess: 'Agente "{name}" desinstalado com sucesso!',
      notFound: 'Agente "{name}" não encontrado.'
    },
    dashboard: {
      generating: 'Gerando dashboard...',
      serve: 'Sirva com: npx serve {squad}'
    },
    menu: {
      title: '╔══════════════════════════════════════╗',
      titleLine: '║      Menu OpenCode Squad           ║',
      separator: '╠══════════════════════════════════════╣',
      end: '╚══════════════════════════════════════╝',
      create: 'Criar novo squad',
      run: 'Executar squad existente',
      list: 'Listar todos os squads',
      edit: 'Editar squad',
      skills: 'Gerenciar skills',
      agents: 'Gerenciar agentes',
      runs: 'Ver execuções',
      dashboard: 'Gerar dashboard',
      exit: 'Sair'
    }
  }
};

let currentLocale = 'en';

export function setLocale(locale) {
  if (locales[locale]) {
    currentLocale = locale;
  }
}

export function getLocale() {
  return currentLocale;
}

export function i18n(locale, key) {
  const keys = key.split('.');
  let value = locales[locale] || locales['en'];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
