---
name: ux
description: >
  User Experience: pesquisa com usuários, wireframes, protótipos,
  design system, testes de usabilidade e métricas UX.
version: "1.0.0"
type: prompt
author: ""
categories: [ux, design, research, ui, usability]
icon: "🎯"
dependencies: []
env: []
---

# UX Skill

Habilidade de User Experience para agentes de IA.

## Quando Usar

Use esta skill quando precisar:
- Realizar pesquisas com usuários
- Criar wireframes e protótipos
- Definir personas e jornadas
- Projetar fluxos de usuário
- Melhorar usabilidade
- Criar design systems
- Conduzir testes de usabilidade
- Analisar métricas UX

## Instruções

### 1. Pesquisa com Usuários

#### Tipos de Pesquisa

```
Quantitativa:          Qualitativa:
- Surveys              - Entrevistas
- Analytics           - Focus groups
- A/B Testing          - Observação
- Card Sorting         - Contextual inquiry
```

#### Criando Entrevistas

```markdown
## Roteiro de Entrevista

### Introdução (2 min)
- Agradecer participação
- Explicar objetivo
- Pedir permissão para gravar

### Contexto (5 min)
- "Conte-me sobre como você geralmente faz [tarefa]"
- "Qual foi a última vez que você..."
- "O que você mais gosta em [sistema atual]?"

### Exploração (15 min)
- "Me mostre como você faria..."
- "O que você esperaria encontrar aqui?"
- "Por que você clicou ali?"

### Conclusão (3 min)
- "Se você pudesse mudar uma coisa..."
- "Tem algo mais que gostaria de compartilhar?"

### Perguntas Proibidas
- "Você gosta de...?" (sugestiva)
- "Você não acha que...?" (liderança)
- "Quantas vezes por semana...?" (sem contexto)
```

#### Análise de Dados Qualitativos

```markdown
## Affinity Mapping

Processo:
1. Escrever insights em post-its digitais
2. Agrupar por temas相似
3. Nomear cada grupo
4. Priorizar por impacto

Categorias comuns:
- Fluxo / Navegação
- Conteúdo / Informação
- Visual / Layout
- Performance / Velocidade
- Funcionalidade
```

### 2. Personas

```markdown
## Persona Template

### Dados Demográficos
- Nome: [Fictício]
- Idade: XX
- Profissão: [Cargo]
- Localização: [Cidade/Região]
- Tecnologia: [Nível de conhecimento]

### Comportamento
- Como usa o produto: [Padrão de uso]
- Frequência: [Diária/Semanal/Mensal]
- Canais preferido: [App/Web/Ambos]
- Dispositivo principal: [Mobile/Desktop]

### Objetivos
1. [Objetivo principal]
2. [Objetivo secundário]

### Dores
1. [Problema/Dificuldade]
2. [Frustração]

### Motivação
[Por que usa o produto]

### Citação
"Eu só quero [ação simples] sem [complicação]."
```

### 3. Jornada do Usuário

```markdown
## User Journey Map

### Header
- Persona: [Nome da persona]
- Cenário: [O que está acontecendo]
- Data: [Quando isso ocorre]

### Colunas
| Fase | Touchpoint | Ações | Pensamentos | Emoções | Oportunidades |
|------|------------|-------|--------------|---------|---------------|

### Fases Típicas
1. Descoberta
2. Consideração
3. Decisão
4. Aquisição
5. Uso
6. Retenção
7. Advocacy

### Escala de Emoção
😡 😒 😐 🙂 😊
(Muito insatisfeito a Muito satisfeito)
```

### 4. Wireframes

#### Elementos Essenciais

```
Layout:
├── Header (logo, nav, search)
├── Sidebar (menu, filtros)
├── Content Area (principal)
├── Footer (links, copyright)
└── Modals (interações)

Componentes:
- Cards
- Listas
- Formulários
- Botões
- Imagens
- Textos
```

#### Wireframe de Alta Fidelidade (HTML/CSS)

```html
<!-- Exemplo de wireframe interativo -->
<div class="wireframe">
  <header class="header">
    <div class="logo">Logo</div>
    <nav class="nav">
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </header>
  
  <main class="content">
    <div class="card">
      <div class="placeholder image">Imagem</div>
      <div class="placeholder text">Título</div>
      <div class="placeholder text small">Descrição</div>
      <button>CTA</button>
    </div>
  </main>
</div>
```

### 5. Design System

#### Tokens de Design

```json
{
  "colors": {
    "primary": "#0066FF",
    "secondary": "#6B7280",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444",
    "background": {
      "light": "#FFFFFF",
      "dark": "#111827"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "Inter, sans-serif",
      "mono": "Fira Code, monospace"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem"
  }
}
```

#### Componentes Documentados

```markdown
## Button

### Variants
- Primary: Fundo sólido, texto branco
- Secondary: Borda, fundo transparente
- Ghost: Sem borda, texto colorido
- Danger: Fundo vermelho para ações destrutivas

### Sizes
- Small: 32px altura
- Medium: 40px altura
- Large: 48px altura

### Estados
- Default: Estado normal
- Hover: Elevação sutil, cor mais escura
- Active: Escala 0.98, cor mais escura
- Disabled: Opacidade 50%, cursor not-allowed
- Loading: Spinner, texto "Carregando..."

### Acessibilidade
- Contraste mínimo 4.5:1
- Focus ring visível
- aria-label quando sem texto
- aria-disabled quando desabilitado

### Código
\`\`\`jsx
<Button variant="primary" size="md">
  Clique aqui
</Button>
\`\`\`
```

### 6. Heurísticas de Usabilidade

#### 10 Heurísticas de Nielsen

1. **Visibilidade do status do sistema**
   - Progress bars, confirmações
   - "Salvando..." / "Salvo"

2. **Correspondência entre sistema e mundo real**
   - Linguagem familiar
   - Ícones reconhecíveis

3. **Controle e liberdade do usuário**
   - Botões "undo/redo"
   - Saídas claras

4. **Consistência e padrões**
   - Mesmos padrões em todo lugar
   - Seguir convenções da plataforma

5. **Prevenção de erros**
   - Validação inline
   - Confirmações para ações irreversíveis

6. **Reconhecimento ao invés de memorização**
   - Menus visíveis
   - Labels claros

7. **Flexibilidade e eficiência**
   - Atalhos para avançados
   - Personalização

8. **Design estético e minimalista**
   - Apenas o necessário
   - Hierarquia visual clara

9. **Ajuda para reconhecer e recuperar erros**
   - Mensagens claras de erro
   - Sugestões de correção

10. **Ajuda e documentação**
    - Tooltips
    - Tutoriais
    - Central de ajuda

### Checklist de Auditoria

```markdown
## Usability Audit Checklist

### Navigation
- [ ] Menu sempre visível
- [ ] Breadcrumbs presentes
- [ ] Voltar funciona corretamente
- [ ] Logo leva para home

### Forms
- [ ] Labels associados aos campos
- [ ] Placeholder como hint, não label
- [ ] Validação em tempo real
- [ ] Mensagens de erro claras
- [ ] Botão de submit desabilitado durante loading

### Feedback
- [ ] Loading states visíveis
- [ ] Success/error messages
- [ ] Toasts para ações secundárias
- [ ] Modals para ações importantes

### Responsividade
- [ ] Mobile-first
- [ ] Breakpoints adequados
- [ ] Touch targets 44x44px mínimo
```

### 7. Testes de Usabilidade

#### Script de Teste

```markdown
## Moderated Usability Test

### Antes (5 min)
- Briefing e consentimento
- Perguntas iniciais (aquecimento)

### Tarefa 1 (10 min)
"Imagine que você quer [ação]. Como você faria?"

Perguntas de probing:
- "O que você está olhando agora?"
- "O que você esperava encontrar?"
- "O que você faria se..."

### Tarefa 2 (10 min)
[Segunda tarefa]

### Tarefa 3 (10 min)
[Terceira tarefa]

### Após (10 min)
- O que foi mais difícil?
- O que você mais gostou?
- O que mudaria?

### Métricas
- Tempo na tarefa
- Taxa de sucesso (completou/não completou)
- Erros cometidos
- NPS: 0-10
```

#### Análise de Resultados

```markdown
## Results Analysis

### Quantitative
| Métrica | Resultado | Meta | Status |
|---------|-----------|------|--------|
| Taxa de conclusão | 85% | 90% | ⚠️ |
| Tempo médio | 45s | 30s | ❌ |
| Erros por tarefa | 1.2 | <1 | ⚠️ |

### Qualitative Themes
1. **Confusão no menu** (4/5 participantes)
   - "Não sabia onde clicar"
   
2. **Formulário longo** (3/5 participantes)
   - "Muita informação de uma vez"

3. **Feedback positivo** (5/5 participantes)
   - "Gostei das animações"
```

### 8. Métricas UX

#### KPIs Importantes

```
Engagement:
- DAU/MAU (Daily/Monthly Active Users)
- Tempo na página
- Pages per session
- Bounce rate

Conversion:
- Taxa de conversão
- Funil de abandono
- Cart abandonment

Satisfaction:
- NPS (Net Promoter Score)
- CSAT (Customer Satisfaction)
- CES (Customer Effort Score)
- SUS (System Usability Scale)
```

#### Google Analytics Setup

```javascript
// Eventos personalizados
gtag('event', 'view_item', {
  currency: 'BRL',
  value: 99.90,
  items: [{
    item_id: 'prod_123',
    item_name: 'Produto X',
    item_category: 'Eletrônicos',
    price: 99.90,
    quantity: 1
  }]
});
```

## Output Format

Ao criar entregáveis UX:

```markdown
## Deliverable: [Name]

### Objetivo
[Por que isso está sendo criado]

### Metodologia
[Como foi feito]

### Findings
1. [Insight 1]
2. [Insight 2]

### Recommendations
1. **Alta Prioridade**: [Recomendação]
2. **Média Prioridade**: [Recomendação]
3. **Baixa Prioridade**: [Recomendação]

### Próximos Passos
- [ ] Ação 1
- [ ] Ação 2
```

## Quality Criteria

- [ ] Baseado em dados (pesquisa)
- [ ] Personas atualizadas (< 1 ano)
- [ ] Journey map com oportunidades claras
- [ ] Wireframes testados
- [ ] Design system consistente
- [ ] Testes de usabilidade realizados
- [ ] Métricas sendo monitoradas
- [ ] documentação acessível

## Ferramentas

### Pesquisa
- Maze, UserTesting, Hotjar
- Google Forms, Typeform
- Dovetail, Notion (análise)

### Design
- Figma, Sketch, Adobe XD
- Miro, FigJam (wireframes)
- Storybook (design system)

### Testes
- Maze, UserZoom
- Hotjar (recordings)
- FullStory

## Recursos Adicionais

- [Nielsen Norman Group](https://nngroup.com/)
- [UX Collective](https://uxdesign.cc/)
- [Interaction Design Foundation](https://www.interaction-design.org/)
- [Google UX Fundamentals](https://developers.google.com/web/fundamentals/design-and-ux/ux-basics/)
