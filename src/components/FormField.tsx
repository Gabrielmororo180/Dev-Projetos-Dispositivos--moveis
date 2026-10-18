import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ label, error, hint, children }: FormFieldProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-medium text-slate-700">{label}</Text>
      {children}
      {error ? (
        <Text className="text-xs text-expense">{error}</Text>
      ) : (
        hint && <Text className="text-xs text-slate-400">{hint}</Text>
      )}
    </View>
  );
}
