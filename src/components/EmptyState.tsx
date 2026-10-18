import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
}

export function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <View className="items-center px-6 py-12">
      <Text className="text-base font-semibold text-slate-700">{title}</Text>
      {children && <View className="mt-2 items-center">{children}</View>}
    </View>
  );
}
