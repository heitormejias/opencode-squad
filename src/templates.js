export async function copyCommonTemplates(targetDir) {
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const templateFiles = {
    'squad.yaml': `# OpenCode Squad Configuration
squad:
  code: my-squad
  name: My Squad
  description: Description of your squad
  icon: "🤖"

agents:
  - ./agents/researcher.agent.md
  - ./agents/writer.agent.md

skills: []

pipeline:
  input: input/task.md
  steps:
    - step-01-research
    - step-02-create
`,
    'squad-party.csv': `path,displayName,icon,role
./agents/researcher.agent.md,Researcher,🔍,Research
./agents/writer.agent.md,Writer,✍️,Content Creation
`,
    'agents/researcher.agent.md': `---
name: researcher
displayName: Researcher
icon: "🔍"
role: Research
mode: subagent
description: Researches and gathers information
tools:
  read: true
  grep: true
  glob: true
  bash: false
  edit: false
---

# Researcher Agent

You are a meticulous researcher who gathers accurate and relevant information.

## Your Role
- Research topics thoroughly
- Find reliable sources
- Organize findings clearly
- Present data in structured format

## Output Format
- Summary of findings
- Key insights
- Source references
- Recommended angles
`,
    'agents/writer.agent.md': `---
name: writer
displayName: Writer
icon: "✍️"
role: Content Creation
mode: subagent
description: Creates written content
tools:
  read: true
  write: true
  bash: false
---

# Writer Agent

You are a skilled writer who creates engaging content.

## Your Role
- Write clear, engaging content
- Adapt tone to audience
- Follow brand guidelines
- Ensure readability

## Output Format
- Main content
- Key points
- Call to action
`
  };
  
  for (const [filePath, content] of Object.entries(templateFiles)) {
    const fullPath = path.join(targetDir, 'squads', 'templates', filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
  }
}
