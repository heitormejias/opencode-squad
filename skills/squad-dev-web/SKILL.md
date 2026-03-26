---
name: squad-dev-web
description: >
  Squad completo de desenvolvimento web: UX → Frontend → Backend → Segurança.
  Pipeline: Designer UX → Dev Frontend → Dev Backend → Auditor Segurança.
version: "1.0.0"
type: prompt
author: ""
categories: [squad, development, fullstack, web]
icon: "🌐"
dependencies: [ux, dev-frontend, dev-backend, auditor-seguranca]
env: []
---

# Squad Dev Web

Squad de desenvolvimento web completo com especialistas em UX, Frontend, Backend e Segurança.

## Pipeline de Execução

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│     UX      │───▶│  FRONTEND   │───▶│   BACKEND   │───▶│ SEGURANÇA   │
│  Designer   │    │   Dev       │    │   Dev       │    │   Auditor   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                   │                   │
      ▼                  ▼                   ▼                   ▼
   Wireframes        Componentes         APIs/Services        Audit Report
   Personas          UI responsiva        DB Design            Vulnerabilities
   User Journey      Integrações          Auth/Security       Compliance
```

## Agentes do Squad

### 1. UX Designer

**Responsabilidades:**
- Criar personas e jornadas do usuário
- Projetar wireframes e protótipos
- Definir design system
- Garantir acessibilidade
- Testes de usabilidade

**Skills carregadas:** `ux`

### 2. Frontend Developer

**Responsabilidades:**
- Implementar interfaces responsivas
- Criar componentes reutilizáveis
- Gerenciar estado da aplicação
- Integrar com APIs
- Performance e acessibilidade

**Skills carregadas:** `dev-frontend`, `ux`

### 3. Backend Developer

**Responsabilidades:**
- Projetar APIs RESTful
- Modelar banco de dados
- Implementar autenticação
- Performance e caching
- Logs e monitoramento

**Skills carregadas:** `dev-backend`, `auditor-seguranca`

### 4. Security Auditor

**Responsabilidades:**
- Analisar código em busca de vulnerabilidades
- Verificar compliance (LGPD/GDPR)
- Testar autenticação e autorização
- Documentar findings
- Propor correções

**Skills carregadas:** `auditor-seguranca`

## Etapas do Pipeline

### Etapa 1: UX Research
- Personas e jornadas
- Wireframes de baixa fidelidade
- Fluxos de usuário
- Critérios de aceitação

### Etapa 2: Frontend Development
- Design system baseado em UX
- Componentes responsivos
- Integrações com API mock
- Testes de usabilidade

### Etapa 3: Backend Development
- Arquitetura de APIs
- Banco de dados
- Autenticação e autorização
- Documentação

### Etapa 4: Security Audit
- Code review de segurança
- OWASP Top 10
- Testes de penetração
- Relatório final

## Checkpoints

```
Checkpoint 1: Design Aprovado
  - Personas validadas
  - Wireframes aprovadas
  - Fluxos definidos

Checkpoint 2: Frontend Aprovado
  - Design implementado
  - Responsivo
  - Acessível

Checkpoint 3: Backend Aprovado
  - APIs funcionando
  - Auth implementado
  - Documentado

Checkpoint Final: Security Aprovado
  - Sem vulnerabilidades críticas
  - Compliance verificado
  - Ready for Production
```

## Output Esperado

1. **Design Package**
   - Personas.md
   - UserJourney.md
   - Wireframes.fig
   - DesignSystem.md

2. **Frontend Package**
   - Código fonte completo
   - Testes unitários
   - Storybook
   - README.md

3. **Backend Package**
   - Código fonte completo
   - API Documentation
   - Database Schema
   - Postman Collection

4. **Security Package**
   - Security Audit Report
   - Vulnerabilities Found
   - Recommendations
   - Compliance Checklist

## Métricas de Qualidade

| Fase | Métrica | Meta |
|------|---------|------|
| UX | Nielsen Score | > 70 |
| Frontend | Lighthouse Score | > 90 |
| Backend | API Response Time | < 200ms |
| Security | Vulnerabilities Critical | 0 |

## Uso

```bash
opencode-squad create "Squad de desenvolvimento web: UX → Frontend → Backend → Segurança"
opencode-squad run squad-dev-web
```
