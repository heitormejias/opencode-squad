# OpenCode Squad - Skills Catalog

Catálogo de skills disponíveis para o framework OpenCode Squad.

## Skills de Desenvolvimento

### dev-backend
**Desenvolvimento Backend**

APIs, bancos de dados, microserviços, autenticação e arquitetura server-side.

- APIs RESTful/GraphQL
- Autenticação JWT/OAuth
- PostgreSQL, MongoDB, Redis
- Node.js, Python, Go, Java

📁 `/skills/dev-backend/SKILL.md`

---

### dev-frontend
**Desenvolvimento Frontend**

Interfaces web modernas, frameworks, estado, roteamento e performance.

- React, Vue, Angular
- TypeScript
- CSS Modules, Tailwind
- React Query, Redux

📁 `/skills/dev-frontend/SKILL.md`

---

### dev-mobile
**Desenvolvimento Mobile**

Apps nativos e multiplataforma, React Native, Flutter, integração com dispositivos.

- React Native, Expo
- Flutter
- iOS, Android
- Push notifications, câmera, biometria

📁 `/skills/dev-mobile/SKILL.md`

---

## Skills de Design

### ux
**User Experience**

Pesquisa com usuários, wireframes, protótipos, design system e testes de usabilidade.

- Personas e jornadas
- Wireframes de alta/baixa fidelidade
- Design system
- Heurísticas de Nielsen
- Testes de usabilidade

📁 `/skills/ux/SKILL.md`

---

## Skills de Segurança

### auditor-seguranca
**Auditoria de Segurança**

Análise de vulnerabilidades, OWASP Top 10, compliance LGPD/GDPR, pentesting.

- OWASP Top 10 (2021)
- Code review de segurança
- Análise de risco
- Compliance (LGPD, GDPR, PCI-DSS)
- DevSecOps

📁 `/skills/auditor-seguranca/SKILL.md`

---

## Squads Pré-configurados

### squad-dev-web
**Squad de Desenvolvimento Web**

Pipeline completo: UX → Frontend → Backend → Segurança

```
UX Designer → Frontend Dev → Backend Dev → Security Auditor
```

📁 `/skills/squad-dev-web/SKILL.md`

---

### squad-fullstack
**Squad Fullstack Completo**

UX → Frontend → Backend → Mobile → Segurança

📁 `/skills/squad-fullstack/SKILL.md`

---

## Instalação

```bash
# Listar skills disponíveis
opencode-squad skills

# Instalar uma skill
opencode-squad install dev-backend
opencode-squad install ux
opencode-squad install auditor-seguranca

# Instalar squad completo
opencode-squad install squad-dev-web
```

## Criar Squad Custom

```bash
opencode-squad create "Um squad que usa UX, Frontend e Backend"
```

O Architect criará um squad com os agentes e skills necessários.
