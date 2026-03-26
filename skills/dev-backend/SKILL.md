---
name: dev-backend
description: >
  Desenvolvimento backend: APIs, bancos de dados, microserviços,
  autenticação, e arquitetura de sistemas server-side.
version: "1.0.0"
type: prompt
author: ""
categories: [development, backend, api, database]
icon: "⚙️"
dependencies: []
env: []
---

# Dev Backend Skill

Habilidade de desenvolvimento backend para agentes de IA.

## Quando Usar

Use esta skill quando precisar:
- Criar APIs REST ou GraphQL
- Implementar autenticação e autorização
- Modelar bancos de dados
- Desenvolver microserviços
- Criar webhooks e integrações
- Implementar caching e filas
- Escalar aplicações server-side

## Instruções

### 1. Arquitetura de APIs

#### RESTful Best Practices

```
Recursos: /users, /orders, /products
Verbos HTTP: GET, POST, PUT, PATCH, DELETE
Status Codes: 200, 201, 400, 401, 403, 404, 500

Exemplo:
GET    /users      → Lista usuários
POST   /users      → Cria usuário
GET    /users/:id  → Busca usuário
PUT    /users/:id  → Atualiza usuário
DELETE /users/:id  → Remove usuário
```

#### Versionamento de API

```
/api/v1/users
/api/v2/users
```

Sempre versione sua API para manter compatibilidade.

### 2. Autenticação e Autorização

#### JWT (JSON Web Tokens)

```javascript
// Payload típico
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234571490
}
```

#### OAuth 2.0 Flows

- Authorization Code (web apps)
- Client Credentials (machine-to-machine)
- Refresh Token (renewal)

#### Permissões

```javascript
const permissions = {
  admin: ['read', 'write', 'delete'],
  editor: ['read', 'write'],
  viewer: ['read']
};
```

### 3. Modelagem de Dados

#### Padrões de Schema

```javascript
// Exemplo mongoose
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    name: String,
    avatar: String
  },
  roles: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

#### Relacionamentos

- One-to-One: User → Profile
- One-to-Many: User → Posts
- Many-to-Many: Users ↔ Roles

### 4. Performance

#### Caching

```javascript
// Redis example
await redis.setex('user:123', 3600, JSON.stringify(user));
const cached = await redis.get('user:123');
```

#### Query Optimization

```sql
-- Usar índices
CREATE INDEX idx_users_email ON users(email);

-- Evitar N+1 queries
-- BAD: SELECT * FROM orders WHERE user_id = ?
-- GOOD: SELECT * FROM orders WHERE user_id IN (?, ?, ?)
```

#### Pagination

```javascript
// Cursor-based (melhor para grandes datasets)
const cursor = req.query.cursor;
const limit = 20;
const orders = await Order.find({
  _id: { $lt: cursor }
}).limit(limit);
```

### 5. Error Handling

```javascript
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

// Uso
throw new AppError('User not found', 404, 'USER_NOT_FOUND');
```

### 6. Middleware Pattern

```javascript
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

## Output Format

Ao criar endpoints, sempre inclua:

```markdown
## Endpoint: [METHOD] /path

### Request
- Headers: [required headers]
- Body: [schema if applicable]

### Response
- Success (200/201): [response schema]
- Error (4xx/5xx): [error schema]

### Implementation
[código de exemplo]

### Tests
[casos de teste]
```

## Quality Criteria

- [ ] API RESTful e consistente
- [ ] Autenticação/autorização implementada
- [ ] Validação de input
- [ ] Tratamento de erros adequado
- [ ] Logs de auditoria
- [ ] Rate limiting
- [ ] Documentação completa
- [ ] Tests unitários

## Tecnologias Suportadas

### Node.js / TypeScript
- Express, Fastify, NestJS
- Prisma, TypeORM, Mongoose
- PostgreSQL, MySQL, MongoDB, Redis

### Python
- FastAPI, Flask, Django
- SQLAlchemy, Peewee
- PostgreSQL, SQLite

### Go
- Gin, Echo, Fiber
- GORM, sqlx
- PostgreSQL, MySQL

### Java
- Spring Boot, Quarkus
- JPA, Hibernate
- PostgreSQL, MySQL

## Recursos Adicionais

- [RESTful API Design Guide](https://restfulapi.net/)
- [JSON API Specification](https://jsonapi.org/)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
