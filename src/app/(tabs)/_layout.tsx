import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

import { colors } from '@/constants/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  size: number;
  focused: boolean;
}

function tabIcon(name: IconName, focusedName: IconName) {
  return function TabIcon({ size, focused }: TabIconProps) {
    return (
      <Ionicons
        name={focused ? focusedName : name}
        size={size}
        color={focused ? colors.brand : colors.textMuted}
      />
    );
  };
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerTitle: 'FinPulse',
          tabBarIcon: tabIcon('home-outline', 'home'),
        }}
      />
      <Tabs.Screen
        name="extrato"
        options={{
          title: 'Extrato',
          headerTitle: 'Extrato de Gastos',
          tabBarIcon: tabIcon('list-outline', 'list'),
        }}
      />
      <Tabs.Screen
        name="metas"
        options={{
          title: 'Metas',
          headerTitle: 'Metas do Mês',
          tabBarIcon: tabIcon('flag-outline', 'flag'),
        }}
      />
      <Tabs.Screen
        name="relatorios"
        options={{
          title: 'Relatórios',
          headerTitle: 'Relatórios',
          tabBarIcon: tabIcon('pie-chart-outline', 'pie-chart'),
        }}
      />
    </Tabs>
  );
}
