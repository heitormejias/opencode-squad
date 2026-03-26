---
name: opencode-squad
description: >
  OpenCode Squad framework for multi-agent orchestration.
  Create teams of specialized AI agents that work together.
version: "0.1.0"
type: prompt
categories: [orchestration, agents, framework]
---

# OpenCode Squad Integration

This project uses **OpenCode Squad** for multi-agent orchestration.

## Quick Commands

| Command | Description |
|---------|-------------|
| `opencode-squad init` | Initialize squad framework |
| `opencode-squad create "description"` | Create a new squad |
| `opencode-squad run <name>` | Run a squad |
| `opencode-squad list` | List all squads |

## Project Structure

```
squads/
├── my-squad/
│   ├── squad.yaml           # Squad configuration
│   ├── squad-party.csv      # Agent manifest
│   ├── agents/              # Agent definitions
│   ├── pipeline/            # Execution pipeline
│   ├── _memory/             # Squad knowledge
│   └── output/              # Execution outputs
skills/                      # Installed skills
.opencode/agents/           # Custom agents
```

## Creating a Squad

1. Describe what you need:
   ```
   opencode-squad create "A squad that writes blog posts"
   ```

2. The Architect agent will design the squad

3. Approve the design

4. Run the squad:
   ```
   opencode-squad run my-squad
   ```

## Agent Handoff

When a squad runs, agents pass work to each other in sequence:

```
Researcher → Strategist → Writer → Reviewer
```

You only intervene at checkpoints marked for approval.
