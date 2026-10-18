import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="transacao/nova"
          options={{ title: 'Nova Movimentação', presentation: 'modal' }}
        />
        <Stack.Screen name="transacao/[id]" options={{ title: 'Detalhes da Transação' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
      </Stack>
    </>
  );
}
