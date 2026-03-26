---
name: opencode-squad
description: >
  Multi-agent orchestration framework for OpenCode — create AI squads that work together.
  Use /opencode-squad to manage squads, skills, agents, and run orchestrated tasks.
version: "1.0.0"
type: command
author: "Heitor Mejias"
categories: [orchestration, multi-agent, squads, ai]
icon: "🤖"
dependencies: []
env: []
---

# OpenCode Squad Skill

Habilidade de orquestração multi-agente para OpenCode.

## Como Usar

Digite `/opencode-squad` seguido de um comando:

### Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `/opencode-squad init` | Inicializar OpenCode Squad no projeto |
| `/opencode-squad list` | Listar todos os squads |
| `/opencode-squad create [nome]` | Criar um novo squad |
| `/opencode-squad run [nome]` | Executar um squad |
| `/opencode-squad skills` | Gerenciar skills |
| `/opencode-squad agents` | Gerenciar agentes |
| `/opencode-squad runs` | Ver histórico de execuções |
| `/opencode-squad dashboard` | Gerar dashboard do escritório virtual |

### Exemplos

```
/opencode-squad init
/opencode-squad list
/opencode-squad create "My Research Squad"
/opencode-squad run research-squad
/opencode-squad skills list
/opencode-squad agents list
/opencode-squad dashboard
```

## Estrutura de um Squad

Um squad é composto por:

- **Agents**: Agentes de IA com roles específicos (researcher, strategist, writer, etc.)
- **Skills**: Habilidades específicas (web-search, image-generator, etc.)
- **Pipeline**: Fluxo de execução das tarefas

## Arquitetura

```
_opencode-squad/
├── core/           # Core framework
├── _memory/        # Memória compartilhada
squads/
├── my-squad/       # Seu squad
│   ├── agents/     # Agentes do squad
│   └── pipeline/   # Pipeline de execução
skills/             # Skills instaladas
.opencode/
└── agents/         # Agentes customizados
```

## Benefits

- **Collaboration**: Multiple AI agents work together on complex tasks
- **Specialization**: Each agent has a specific role and expertise
- **Orchestration**: Tasks flow through defined pipelines
- **Extensibility**: Easy to add new agents and skills
