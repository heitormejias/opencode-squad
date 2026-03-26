---
name: dev-frontend
description: >
  Desenvolvimento frontend: interfaces web modernas, frameworks React/Vue/Angular,
  estado, roteamento, acessibilidade e performance.
version: "1.0.0"
type: prompt
author: ""
categories: [development, frontend, web, ui, react, vue]
icon: "🎨"
dependencies: []
env: []
---

# Dev Frontend Skill

Habilidade de desenvolvimento frontend para agentes de IA.

## Quando Usar

Use esta skill quando precisar:
- Criar interfaces web responsivas
- Implementar componentes reutilizáveis
- Gerenciar estado de aplicações
- Implementar roteamento
- Integrar com APIs backend
- Otimizar performance
- Garantir acessibilidade
- Criar animações e transições

## Instruções

### 1. Component Architecture

#### Atomic Design

```
Atoms:     Button, Input, Label, Icon
Molecules: SearchBar, Card, Modal
Organisms: Header, Footer, Sidebar
Templates: PageLayout, DashboardLayout
Pages:     HomePage, ProfilePage
```

#### Props e Types

```typescript
// Componente bem tipado
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 2. State Management

#### Local State (useState/useReducer)

```typescript
// useState para estados simples
const [count, setCount] = useState(0);

// useReducer para lógica complexa
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    default: return state;
  }
};
```

#### Global State (Context/Redux/Zustand)

```typescript
// Context API
const ThemeContext = createContext<ThemeContextType>(defaultValue);

// Zustand (mais leve)
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));
```

### 3. Data Fetching

#### React Query / SWR Pattern

```typescript
// React Query
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutos
  retry: 3
});
```

#### Error Handling

```typescript
if (isLoading) return <Skeleton />;
if (error) return <ErrorBoundary error={error} />;
return <UserProfile data={data} />;
```

### 4. Routing

```typescript
// React Router v6
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/users/:id" element={<UserProfile />} />
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<DashboardSettings />} />
  </Route>
</Routes>
```

#### Protected Routes

```typescript
<Route
  path="/admin"
  element={
    <RequireAuth>
      <AdminDashboard />
    </RequireAuth>
  }
/>
```

### 5. Forms e Validação

```typescript
// React Hook Form
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});

<input {...register('email', { required: true })} />
{errors.email && <span>Email is required</span>}
```

#### Zod Schema

```typescript
const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  age: z.number().min(18, 'Mínimo 18 anos')
});
```

### 6. Styling

#### CSS Modules

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.primary {
  background: var(--color-primary);
}
```

#### Tailwind

```jsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>
```

### 7. Acessibilidade (a11y)

```tsx
// Botão acessível
<button
  aria-label="Fechar modal"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <CloseIcon />
</button>

// Form com labels
<label htmlFor="email">Email</label>
<input id="email" aria-describedby="email-help" />
<p id="email-help">We'll never share your email.</p>

// Status live
<div role="status" aria-live="polite">
  {message}
</div>
```

### 8. Performance

#### Code Splitting

```typescript
const LazyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

#### Memoização

```typescript
const ExpensiveList = useMemo(() =>
  items.map(item => <Item key={item.id} data={item} />),
  [items]
);
```

#### Virtualization

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={400}
  itemCount={items.length}
  itemSize={50}
>
  {({ index, style }) => (
    <div style={style}>{items[index].name}</div>
  )}
</FixedSizeList>
```

## Output Format

Ao criar componentes:

```markdown
## Component: [Name]

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| name | string | yes | - | Component name |

### States
- Default: [visual description]
- Hover: [visual description]
- Disabled: [visual description]
- Loading: [visual description]

### Usage
\`\`\`jsx
<[Name] prop="value" />
\`\`\`

### Accessibility
- [x] Has proper labels
- [x] Keyboard navigable
- [x] Screen reader friendly
```

## Quality Criteria

- [ ] Componentes reutilizáveis
- [ ] Props bem documentadas
- [ ] Tratamento de loading/error
- [ ] Responsivo (mobile-first)
- [ ] Acessível (WCAG 2.1)
- [ ] Performático
- [ ] Testado
- [ ] Tokens de design consistentes

## Frameworks Suportados

### React Ecosystem
- Next.js, Remix, Vite
- Tailwind, CSS Modules, Styled Components
- React Query, SWR, Apollo Client
- React Hook Form, Formik

### Vue Ecosystem
- Nuxt.js, Vue CLI
- Pinia, Vuex, Composition API
- Tailwind, SCSS

### Angular
- Angular CLI
- RxJS, NgRx
- Angular Material, Tailwind

## Recursos Adicionais

- [MDN Web Docs](https://developer.mozilla.org/)
- [React Docs](https://react.dev/)
- [Vue Docs](https://vuejs.org/)
- [A11y Project](https://www.a11yproject.com/)
- [Web.dev](https://web.dev/)
