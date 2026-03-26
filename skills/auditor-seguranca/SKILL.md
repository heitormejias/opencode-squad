---
name: auditor-seguranca
description: >
  Auditoria de segurança da informação: análise de vulnerabilidades,
  testes de penetração, compliance, OWASP e melhores práticas.
version: "1.0.0"
type: prompt
author: ""
categories: [security, audit, compliance, pentest, owasp]
icon: "🔒"
dependencies: []
env: []
---

# Auditor Segurança Skill

Habilidade de auditoria de segurança para agentes de IA.

## Quando Usar

Use esta skill quando precisar:
- Auditar código em busca de vulnerabilidades
- Implementar controles de segurança
- Realizar análise de risco
- Verificar compliance (LGPD, GDPR, PCI-DSS)
- Criar políticas de segurança
- Documentar incidentes
- Treinar equipes em segurança
- Implementar DevSecOps

## Instruções

### 1. OWASP Top 10 (2021)

#### A01: Broken Access Control

```markdown
## Verificação: Broken Access Control

### Checklist
- [ ] Usuários podem acessar recursos não autorizados?
- [ ] GET/POST/PUT/DELETE todos verificados?
- [ ]IDs sequenciais evitados? (usar UUID)
- [ ]Funções admin verificadas no servidor?

### Código Seguro
\`\`\`javascript
// BAD
app.get('/user/:id', (req, res) => {
  const user = db.find(req.params.id);
  res.json(user);
});

// GOOD
app.get('/user/:id', authenticate, (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const user = db.find(req.params.id);
  res.json(user);
});
\`\`\`
```

#### A02: Cryptographic Failures

```markdown
## Verificação: Falhas Criptográficas

### Checklist
- [ ] Dados sensíveis criptografados em repouso?
- [ ] TLS usado para todos os dados em trânsito?
- [ ] Algoritmos fortes (AES-256, RSA-2048+)?
- [ ] Chaves gerenciadas em HSM/vault?
- [ ] Senhas com bcrypt/argon2?

### Implementação Correta
\`\`\`javascript
// Hash de senha
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
\`\`\`
```

#### A03: Injection

```markdown
## Verificação: Injection (SQL, XSS, Command)

### SQL Injection
\`\`\`javascript
// BAD - Vulnerável
const query = \`SELECT * FROM users WHERE id = \${req.params.id}\`;

// GOOD - Parameterized
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [req.params.id]);
\`\`\`

### XSS Prevention
\`\`\`javascript
// Sanitização de HTML
const DOMPurify = require('isomorphic-dompurify');

// Sempre escapar output
// Usar template engines com auto-escape (EJS, Handlebars)
\`\`\`

### Command Injection
\`\`\`javascript
// BAD
exec(\`ls \${userInput}\`);

// GOOD - Sem shell
execFile('ls', [userInput], (err, stdout) => {});

// Ou usar libraries específicas
const path = require('path');
const safePath = path.resolve(userInput);
\`\`\`
```

#### A04: Insecure Design

```markdown
## Verificação: Design Inseguro

### Princípios
- Fail securely (falhas devem ser seguras)
- Defense in depth (múltiplas camadas)
- Least privilege (mínimo de privilégios)
- Zero trust

### Rate Limiting
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: 'Muitas tentativas. Tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
\`\`\`
```

#### A05: Security Misconfiguration

```markdown
## Verificação: Misconfiguration

### Checklist
- [ ] Headers de segurança configurados?
- [ ] Debug desabilitado em produção?
- [ ] Credenciais default alteradas?
- [ ] Permissions corretas em arquivos?

### Headers de Segurança
\`\`\`javascript
const helmet = require('helmet');

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
  }
}));
\`\`\`

### Configuração de Headers
\`\`\`
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
\`\`\`
```

#### A06: Vulnerable Components

```markdown
## Verificação: Componentes Vulneráveis

### NPM Audit
\`\`\`bash
npm audit
npm audit fix
npm outdated
\`\`\`

### Verificação de Dependências
\`\`\`javascript
// package.json - usar auditoria no CI/CD
"scripts": {
  "audit": "npm audit --audit-level=moderate",
  "security:check": "npx snyk test"
}
\`\`\`

### Política de Dependências
- Auditar antes de adicionar
- Fixar versões (no package-lock.json)
- Monitorar CVEs ativamente
- Usar ferramentas: Snyk, Dependabot, Socket.dev
```

#### A07: Auth Failures

```markdown
## Verificação: Falhas de Autenticação

### Checklist
- [ ] Senhas fortes exigidas?
- [ ] 2FA disponível?
- [ ] Sessions expiram corretamente?
- [ ] Tokens JWT seguros?

### JWT Security
\`\`\`javascript
const jwt = require('jsonwebtoken');

// GOOD - Com expire e algoritmos seguros
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { 
    expiresIn: '1h',
    algorithm: 'HS256'
  }
);

// GOOD - Refresh token rotation
const refreshToken = jwt.sign(
  { userId: user.id, type: 'refresh' },
  process.env.REFRESH_SECRET,
  { expiresIn: '7d' }
);
\`\`\`

### Session Management
\`\`\`javascript
// Cookies seguros
res.cookie('sessionId', token, {
  httpOnly: true,    // Não acessível via JS
  secure: true,      // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 3600000    // 1 hora
});
\`\`\`
```

#### A08: Software Integrity Failures

```markdown
## Verificação: Integridade de Software

### Assinatura de Artefatos
\`\`\`bash
# Assinar container image
cosign sign --yes myregistry/myimage:sha256-xxx

# Verificar antes de deploy
cosign verify --certificate-identity myregistry.io/myimage \
  myregistry.io/myimage:sha256-xxx
\`\`\`

### SBOM (Software Bill of Materials)
\`\`\`bash
# Gerar SBOM
npx @cyclonedx/cyclonedx-npm --output-file sbom.json

# Verificar vulnerabilidades
npx sbom-check ./sbom.json
\`\`\`
```

#### A09: Logging & Monitoring

```markdown
## Verificação: Logging e Monitoring

### O que logar
\`\`\`javascript
const logger = require('./logger');

// Sempre logar (sem PII)
logger.info('Login attempt', {
  userId: user.id,
  ip: req.ip,
  userAgent: req.get('User-Agent'),
  success: true
});

// Nunca logar
// - Senhas
// - Tokens
// - Dados pessoais sensíveis
\`\`\`

### Alertas de Segurança
\`\`\`
✓ Falha de login > 5 em 10 min
✓ Acesso admin de IP novo
✓ Quantidade anormal de requests
✓ Tentativa de acesso a recurso protegido
\`\`\`
```

#### A10: SSRF (Server-Side Request Forgery)

```markdown
## Verificação: SSRF

### Prevention
\`\`\`javascript
// BAD
const response = await fetch(req.body.url);

// GOOD - Validação de URL
const { URL } = require('url');
try {
  const parsedUrl = new URL(url);
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Invalid protocol');
  }
  if (parsedUrl.hostname === 'localhost' || 
      parsedUrl.hostname === '127.0.0.1' ||
      parsedUrl.hostname.startsWith('169.254.169.254')) {
    throw new Error('Internal hosts not allowed');
  }
} catch (e) {
  return res.status(400).json({ error: 'Invalid URL' });
}
\`\`\`
```

### 2. Análise de Código Seguro

```markdown
## Code Review Security Checklist

### Authentication
- [ ] Autenticação forte implementada?
- [ ] 2FA disponível?
- [ ] Senhas com hash seguro?
- [ ] Session management seguro?
- [ ] Password reset seguro?

### Authorization  
- [ ] Verificações no servidor?
- [ ] Princípio de menor privilégio?
- [ ] Funções admin protegidas?

### Input Validation
- [ ] Todos os inputs validados?
- [ ] Sanitização de XSS?
- [ ] Prepared statements (SQL)?
- [ ] Validação de tipos?

### Output Encoding
- [ ] HTML entities?
- [ ] URL encoding?
- [ ] JSON encoding?

### Cryptography
- [ ] TLS/HTTPS?
- [ ] Dados sensíveis criptografados?
- [ ] Algoritmos fortes?
- [ ] Keys gerenciadas seguro?

### Error Handling
- [ ] Mensagens de erro genéricas?
- [ ] Stack traces em produção?
- [ ] Logs de segurança?

### Dependencies
- [ ] Dependencies atualizadas?
- [ ] Vulnerabilidades conhecidas?
- [ ] Fontes confiáveis?
```

### 3. Compliance e Regulamentações

#### LGPD (Brasil)

```markdown
## LGPD Checklist

### Dados Pessoais
- [ ] Base legal para tratamento documentada?
- [ ] Consentimento obtido quando necessário?
- [ ] Finalidade do tratamento clara?

### Direitos do Titular
- [ ] Acesso aos dados?
- [ ] Correção de dados?
- [ ] Exclusão de dados?
- [ ] Portabilidade?

### Segurança
- [ ] Medidas técnicas de segurança?
- [ ] Controle de acesso?
- [ ] Criptografia?
- [ ] Notificação de incidentes?

### Documentação
- [ ] Registro de operações?
- [ ] Relatório de Impacto (RIPD)?
- [ ] Política de privacidade?

### Violations
- [ ] Notificação à ANPD em 72h?
- [ ] Comunicação aos titulares?
```

#### GDPR (Europa)

```markdown
## GDPR Checklist

### Lawfulness
- [ ] Legal basis documented?
- [ ] Consent clear and unambiguous?
- [ ] Purpose limitation?

### Rights
- [ ] Right to access?
- [ ] Right to erasure?
- [ ] Data portability?
- [ ] Right to object?

### Security
- [ ] DPIA conducted?
- [ ] Appropriate technical measures?
- [ ] Breach notification process?

### Accountability
- [ ] Records of processing?
- [ ] DPO appointed (if required)?
- [ ] Training provided?
```

### 4. Threat Modeling

```markdown
## STRIDE Threat Model

### S - Spoofing (Falsificação)
- Como autenticamos usuários?
- Tokens JWT seguros?
- 2FA implementado?

### T - Tampering (Violação)
- Integridade dos dados?
- Checksums?
- Assinaturas digitais?

### R - Repudiation (Repúdio)
- Logs de auditoria?
- Assinatura de transações?
- Non-repudiation implementado?

### I - Information Disclosure (Divulgação)
- Criptografia de dados?
- Mínimo privilégio de acesso?
- Máscara de dados sensíveis?

### D - Denial of Service (Negação)
- Rate limiting?
- DDoS protection?
- Redundância?

### E - Elevation of Privilege (Elevação)
- Controles de acesso?
- Sandbox de código?
- Princípio de menor privilégio?
```

### 5. DevSecOps

```markdown
## Pipeline de Segurança

### SAST (Static Analysis)
\`\`\`yaml
# .github/workflows/sast.yml
- name: Run Semgrep
  run: semgrep --config=auto --json --output=semgrep.json

- name: Check for vulnerabilities
  if: always()
  run: |
    if grep -q '"errors":' semgrep.json; then
      echo "Security issues found"
      exit 1
    fi
\`\`\`

### SCA (Software Composition Analysis)
\`\`\`yaml
- name: Dependency Check
  run: npm audit --audit-level=high

- name: Snyk Security
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
\`\`\`

### DAST (Dynamic Analysis)
\`\`\`yaml
- name: OWASP ZAP Scan
  uses: zaproxy/action-baseline@master
  with:
    target: 'https://staging.example.com'
\`\`\`

### Container Security
\`\`\`yaml
- name: Trivy Scan
  uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    severity: 'CRITICAL,HIGH'
\`\`\`
```

### 6. Incident Response

```markdown
## Incident Response Plan

### 1. Detection
- [ ] Monitoramento 24/7?
- [ ] SIEM implementado?
- [ ] Honeypots ativos?

### 2. Analysis
- [ ] Timeline reconstruída?
- [ ] Escopo definido?
- [ ] Impacto avaliado?

### 3. Containment
- [ ] Sistemas isolados?
- [ ] Credenciais rotacionadas?
- [ ] Backdoors removidos?

### 4. Eradication
- [ ] Vulnerabilidade corrigida?
- [ ] Malware removido?
- [ ] Sistemas limpos?

### 5. Recovery
- [ ] Backups verificados?
- [ ] Sistemas restaurados?
- [ ] Monitoramento reforçado?

### 6. Lessons Learned
- [ ] Post-mortem documentado?
- [ ] Controles melhorados?
- [ ] Equipe treinada?

### Contactos de Emergência
\`\`\`
CSIRT: +55 XX XXXX-XXXX
CISO: ciso@empresa.com
Legal: legal@empresa.com
PR: comunicacao@empresa.com
\`\`\`
```

## Output Format

```markdown
## Security Audit Report

### Scope
[Sistemas auditados]

### Methodology
[OWASP Top 10, NIST, etc.]

### Findings

#### CRITICAL
| ID | Title | Location | Description | Impact |
|----|-------|----------|-------------|--------|

#### HIGH
| ID | Title | Location | Description | Impact |
|----|-------|----------|-------------|--------|

### Recommendations

#### Immediate (0-7 dias)
1. [Recomendação]

#### Short-term (30 dias)
1. [Recomendação]

#### Long-term (90 dias)
1. [Recomendação]

### Risk Matrix
\`\`\`
        Impact
        Low    Medium    High    Critical
Likelihood
Low         Low      Low      Medium    High
Medium      Low      Medium   High      Critical
High        Medium   High     Critical  Critical
\`\`\`

### Appendices
- [ ] Full vulnerability list
- [ ] Tool outputs
- [ ] Screenshots
- [ ] References
```

## Quality Criteria

- [ ] Metodologia documentada
- [ ] OWASP Top 10 verificado
- [ ] Findings com evidências
- [ ] CVSS score calculado
- [ ] Recomendações acionáveis
- [ ] Priorização por risco
- [ ] Follow-up planejado
- [ ] Compliance verificado

## Ferramentas

### SAST
- Semgrep, SonarQube
- Snyk Code, CodeQL

### DAST
- OWASP ZAP, Burp Suite
- Nuclei, sqlmap

### SCA
- Snyk, Dependabot
- Socket.dev, Grype

### Secrets
- GitLeaks, TruffleHog
- Semgrep Secrets

### Containers
- Trivy, Clair, Anchore

## Recursos Adicionais

- [OWASP](https://owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [CVE Database](https://cve.mitre.org/)
- [NVD](https://nvd.nist.gov/)
- [Security Style Guide](https://securityguide.dev/)
