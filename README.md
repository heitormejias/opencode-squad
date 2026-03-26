# OpenCode Squad

Framework de orquestração multi-agente para OpenCode — crie equipes de agentes de IA que trabalham juntos.

## O que é um Squad?

Um squad é uma equipe de agentes de IA que colaboram em uma tarefa. Cada agente tem um papel específico. Eles executam em pipeline — você só intervém nos checkpoints de decisão.

### Exemplo de Squad

```
🔍 Researcher → 🎯 Strategist → ✍️ Writer → 🎨 Designer → ✅ Reviewer
```

- **Researcher**: Coleta informações e tendências
- **Strategist**: Gera ideias e define a abordagem
- **Writer**: Produz o conteúdo final
- **Designer**: Cria imagens e visuais
- **Reviewer**: Garante qualidade antes da entrega

## Instalação

```bash
npm install -g opencode-squad
```

Ou use diretamente:

```bash
npx opencode-squad init
```

## Comandos

| Comando | Descrição |
|---------|-----------|
| `opencode-squad init` | Inicializar framework no projeto |
| `opencode-squad create [desc]` | Criar novo squad |
| `opencode-squad run <nome>` | Executar squad |
| `opencode-squad list` | Listar squads |
| `opencode-squad skills` | Gerenciar skills |
| `opencode-squad agents` | Gerenciar agentes |
| `opencode-squad runs [squad]` | Ver histórico de execuções |
| `opencode-squad dashboard` | Gerar dashboard visual |

## Uso

### 1. Inicializar

```bash
cd seu-projeto
opencode-squad init
```

Isso cria a estrutura:

```
seu-projeto/
├── squads/              # Seus squads
│   └── templates/       # Templates de squad
├── skills/              # Skills instaladas
├── .opencode/
│   └── agents/          # Agentes personalizados
└── _opensquad/          # Core do framework
```

### 2. Criar um Squad

```bash
opencode-squad create "Um squad que escreve posts de blog sobre IA"
```

O **Architect** (agente arquiteto) vai:
1. Fazer perguntas de esclarecimento
2. Projetar o squad com agentes especializados
3. Criar a pipeline de execução
4. Você aprova o design antes da execução

### 3. Executar um Squad

```bash
opencode-squad run meu-squad
```

O squad executa automaticamente, pausando nos checkpoints.

## Estrutura de um Squad

```
squads/meu-squad/
├── squad.yaml           # Configuração do squad
├── squad-party.csv      # Manifesto dos agentes
├── agents/
│   ├── researcher.agent.md
│   ├── writer.agent.md
│   └── reviewer.agent.md
├── pipeline/
│   ├── steps/
│   │   ├── step-01-research.md
│   │   ├── step-02-checkpoint.md
│   │   └── step-03-write.md
│   └── data/
│       └── brief.md
├── _memory/
│   └── memories.md      # Contexto do squad
└── output/              # Saídas das execuções
```

### squad.yaml

```yaml
squad:
  code: blog-ai
  name: Blog AI Writer
  description: Escreve posts sobre IA
  icon: "✍️"

agents:
  - ./agents/researcher.agent.md
  - ./agents/writer.agent.md
  - ./agents/reviewer.agent.md

pipeline:
  input: input/topic.md
  steps:
    - step-01-research
    - step-02-checkpoint
    - step-03-write
```

## Virtual Office (Dashboard)

Visualização em tempo real dos agentes trabalhando:

```bash
# Gerar dashboard
opencode-squad dashboard meu-squad

# Servir localmente
npx serve squads/meu-squad/dashboard
# ou
cd squads/meu-squad/dashboard && npx serve .
```

Abra `http://localhost:3000` no navegador.

## Tipos de Agentes

### Built-in Agents

| Agente | Descrição |
|--------|-----------|
| researcher | Pesquisa e coleta informações |
| strategist | Define estratégias e abordagens |
| writer | Cria conteúdo escrito |
| designer | Cria designs visuais |
| reviewer | Revisa e garante qualidade |
| architect | Desenha e orquestra squads |

### Custom Agents

Crie agentes em `.opencode/agents/`:

```markdown
---
name: my-agent
mode: subagent
description: Meu agente personalizado
icon: "🎯"
role: Custom
tools:
  read: true
  write: true
  bash: false
---

# My Agent

Você é um agente especializado em...

## Suas responsabilidades
- ...
```

## Pipeline Steps

```markdown
---
execution: subagent     # subagent | inline | checkpoint
agent: researcher       # Qual agente executa
outputFile: output/research.md
---

# Step 01: Research

## Instruções
Pesquise sobre o tema fornecido...

## Critérios de Qualidade
- [ ] Fontes verificáveis
- [ ] Dados recentes
```

## Skills

Skills estendem as capacidades dos agentes:

```bash
opencode-squad install web-search
opencode-squad install image-generator
```

### Built-in Skills

- **web-search**: Busca informações na web
- **web-fetch**: Extrai conteúdo de URLs
- **image-generator**: Gera imagens com IA

## Checkpoints

Checkpoints pausam a execução para decisão humana:

```markdown
---
execution: checkpoint
---

# Checkpoint: Selecione o Ângulo

Encontrei 3 possíveis ângulos para o post:

1. **Para iniciantes** - Linguagem acessível
2. **Para especialistas** - Detalhes técnicos
3. **Casos de uso** - Exemplos práticos

Por favor, selecione o ângulo desejado.
```

## Internacionalização

```bash
# Mudar idioma
opencode-squad locale pt-BR
opencode-squad locale en
```

Idiomas suportados: `en`, `pt-BR`

## Licença

MIT — use como quiser.
