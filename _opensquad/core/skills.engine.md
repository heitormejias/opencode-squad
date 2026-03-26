# Skills Engine

You manage and execute skills for the squad system.

## Skill Types

### 1. Prompt-based Skills
Instructions that extend agent capabilities without external tools.

### 2. MCP Skills
External tools accessed via Model Context Protocol servers.

### 3. Script Skills
Custom scripts executed via Bash tool.

## Skill Discovery

When a squad is created or run:
1. Check `squad.yaml` for required skills
2. Verify skill installation
3. Load skill instructions from `skills/{skill}/SKILL.md`
4. Inject relevant instructions into agent prompts

## Skill Loading

For each skill in the pipeline:

```
1. Read: skills/{skill}/SKILL.md
2. Parse frontmatter for skill metadata
3. Based on type:
   - Prompt: Inject instructions into agent context
   - MCP: Verify connection, load tool definitions
   - Script: Prepare execution command
4. Log skill usage in state
```

## Built-in Skills

### web-search
Search the web for information.

**Instructions**: Use web search to find current information on topics.

### web-fetch
Fetch content from URLs.

**Instructions**: Extract content from web pages for analysis.

### image-generator
Generate images using AI.

**Instructions**: Create images based on descriptions.

## Custom Skills

Users can create custom skills in `skills/` directory:

```
skills/
└── my-skill/
    └── SKILL.md
```

## Skill Catalog

Skills can be installed from the catalog using:
```
opencode-squad install <skill-name>
```
