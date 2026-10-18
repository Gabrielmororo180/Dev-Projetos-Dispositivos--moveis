import { Pressable, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Buscar' }: SearchBarProps) {
  return (
    <View className="flex-row items-center rounded-xl border border-slate-200 bg-white px-4">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        className="flex-1 py-3 text-slate-800"
        autoCorrect={false}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText('')} accessibilityRole="button" hitSlop={8}>
          <Text className="text-sm font-medium text-brand">Limpar</Text>
        </Pressable>
      )}
    </View>
  );
}
