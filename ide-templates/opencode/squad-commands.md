# OpenCode Squad Commands

When using OpenCode with a squad-enabled project, you can use these commands:

## Squad Commands

### `/squad`
Opens the squad menu with all available options.

### `/squad run <name>`
Runs the specified squad immediately.

### `/squad create "description"`
Creates a new squad based on description.

### `/squad status`
Shows current squad execution status.

### `/squad checkpoint`
Shows pending checkpoints awaiting approval.

## Pipeline Execution

When a squad is running, you'll see:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1/4: Research
🔍 Dispatching to Researcher...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Checkpoints

At checkpoints, you'll be asked to make decisions:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⏸️ CHECKPOINT: Select Topic
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Multiple topics found. Please select:

1. Topic A - AI trends
2. Topic B - Web development  
3. Topic C - DevOps practices

Enter your selection (1-3):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Squad Memory

The squad maintains context in `_memory/memories.md`:

- Squad goals and scope
- Previous execution learnings
- User preferences
- Output patterns

## Custom Agents

Add agents to `.opencode/agents/`:

```markdown
---
name: my-agent
mode: subagent
description: My custom agent
---

Your agent prompt here...
```

## Skills

Skills extend agent capabilities:

```
skills/
├── web-search/
│   └── SKILL.md
├── image-generator/
│   └── SKILL.md
```

## Dashboard

Generate a visual dashboard:

```bash
opencode-squad dashboard <squad-name>
npx serve squads/<squad>/dashboard
```

Then open `http://localhost:3000` to see the Virtual Office.
