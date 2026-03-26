---
name: dev-mobile
description: >
  Desenvolvimento mobile: apps nativos iOS/Android, React Native, Flutter,
  integração com dispositivos, push notifications e app stores.
version: "1.0.0"
type: prompt
author: ""
categories: [development, mobile, ios, android, react-native, flutter]
icon: "📱"
dependencies: []
env: []
---

# Dev Mobile Skill

Habilidade de desenvolvimento mobile para agentes de IA.

## Quando Usar

Use esta skill quando precisar:
- Criar apps para iOS ou Android
- Desenvolver com React Native ou Flutter
- Implementar navegação mobile
- Integrar com APIs e serviços backend
- Implementar autenticação mobile
- Trabalhar com sensores e câmera
- Publicar em app stores
- Otimizar para diferentes dispositivos

## Instruções

### 1. React Native

#### Setup e Estrutura

```bash
npx create-expo-app my-app
# ou
npx react-native init MyApp
```

#### Estrutura de Pastas

```
src/
├── components/      # Componentes reutilizáveis
├── screens/         # Telas da aplicação
├── navigation/      # Configuração de navegação
├── services/        # API, Auth, Storage
├── hooks/           # Custom hooks
├── context/         # React Context
├── utils/          # Funções auxiliares
├── types/          # TypeScript types
└── assets/        # Imagens, fontes
```

#### Componentes Core

```tsx
// View, Text, TouchableOpacity, ScrollView, FlatList
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const UserList = ({ users, onSelect }) => (
  <FlatList
    data={users}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);
```

#### Estilos

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### 2. Flutter

#### Setup e Estrutura

```bash
flutter create my_app
```

#### Estrutura de Pastas

```
lib/
├── main.dart
├── app/
│   ├── app.dart
│   └── routes.dart
├── features/
│   ├── auth/
│   │   ├── presentation/
│   │   ├── domain/
│   │   └── data/
│   └── home/
├── core/
│   ├── theme/
│   ├── utils/
│   └── widgets/
└── shared/
    ├── widgets/
    └── services/
```

#### Widgets Core

```dart
import 'package:flutter/material.dart';

class UserList extends StatelessWidget {
  final List<User> users;
  final Function(User) onSelect;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: users.length,
      itemBuilder: (context, index) {
        final user = users[index];
        return Card(
          child: ListTile(
            leading: CircleAvatar(child: Text(user.name[0])),
            title: Text(user.name),
            subtitle: Text(user.email),
            onTap: () => onSelect(user),
          ),
        );
      },
    );
  }
}
```

### 3. Navegação

#### React Navigation

```tsx
// NavigationContainer
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

#### Flutter Navigation

```dart
// go_router
final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
    ),
    GoRoute(
      path: '/profile/:id',
      builder: (context, state) => ProfileScreen(
        id: state.pathParameters['id']!,
      ),
    ),
  ],
);
```

### 4. Estado e Data

#### Context API (React Native)

```tsx
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

#### Provider Pattern (Flutter)

```dart
class UserProvider extends ChangeNotifier {
  User? _user;
  
  User? get user => _user;
  
  void setUser(User user) {
    _user = user;
    notifyListeners();
  }
}
```

### 5. API Integration

#### Axios (React Native)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const userService = {
  getUsers: () => api.get('/users'),
  getUser: (id: string) => api.get(`/users/${id}`),
  createUser: (data: CreateUserDTO) => api.post('/users', data),
};
```

#### HTTP (Flutter)

```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  final String baseUrl = 'https://api.example.com';
  
  Future<List<User>> getUsers() async {
    final response = await http.get(
      Uri.parse('$baseUrl/users'),
      headers: {'Content-Type': 'application/json'},
    );
    
    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => User.fromJson(json)).toList();
    }
    throw Exception('Failed to load users');
  }
}
```

### 6. Autenticação Mobile

#### React Native

```tsx
// AsyncStorage for token persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

// Expo SecureStore for sensitive data
import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('token', token);
const token = await SecureStore.getItemAsync('token');
```

#### Flutter

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final storage = FlutterSecureStorage();

await storage.write(key: 'token', value: token);
final token = await storage.read(key: 'token');
```

### 7. Native Features

#### Câmera (React Native)

```tsx
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
  });
  
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
```

#### Local Notifications

```tsx
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

await Notifications.scheduleNotificationAsync({
  content: { title: 'Nova mensagem', body: 'Você tem uma nova mensagem!' },
  trigger: null,
});
```

### 8. Publicação

#### App Store (iOS)

```bash
# Build para App Store
xcodebuild -workspace ios/MyApp.xcworkspace \
  -scheme MyApp \
  -configuration Release \
  -archivePath build/MyApp.xcarchive \
  archive

# Validação
xcrun altool --validate-app \
  -f MyApp.ipa \
  -t ios \
  -u user@email.com \
  -p password
```

#### Google Play (Android)

```bash
# Build release
cd android && ./gradlew assembleRelease

# Assinar APK
zipalign -v 4 app-release-unsigned.apk app-release.apk
apksigner sign --ks keystore.jks app-release.apk
```

## Output Format

Ao criar telas mobile:

```markdown
## Screen: [Name]

### Platform: React Native / Flutter

### Props
[Lista de parâmetros]

### Navigation
[Como navegar para esta tela]

### Features
- [ ] Feature 1
- [ ] Feature 2

### States
- Loading: [UI]
- Empty: [UI]
- Error: [UI]
- Success: [UI]

### Platform Specific
- iOS: [considerações]
- Android: [considerações]
```

## Quality Criteria

- [ ] UI responsiva para todos tamanhos
- [ ] Performance fluida (60fps)
- [ ] Suporte offline
- [ ] Tratamento de erros amigável
- [ ] Autenticação segura
- [ ] Acessível (VoiceOver/TalkBack)
- [ ] Testado em múltiplos dispositivos
- [ ] Logs de crash implementados

## Ferramentas

### React Native
- Expo (desenvolvimento rápido)
- React Native CLI
- React Navigation
- Expo Router
- AsyncStorage, SecureStore
- Axios, React Query

### Flutter
- Flutter SDK
- Riverpod / Provider (state)
- go_router (navigation)
- http / dio
- shared_preferences, flutter_secure_storage

## Recursos Adicionais

- [React Native Docs](https://reactnative.dev/)
- [Flutter Docs](https://flutter.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [App Store Guidelines](https://developer.apple.com/app-store/guidelines/)
- [Google Play Policies](https://play.google.com/about/developer-content-policy/)
