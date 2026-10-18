import { Pressable, ScrollView, Text } from 'react-native';

import { CategoryIcon } from '@/components/CategoryIcon';
import type { Category } from '@/types/finance';

interface CategoryPickerProps {
  categories: Category[];
  selectedId?: number;
  onSelect: (id: number) => void;
}

export function CategoryPicker({ categories, selectedId, onSelect }: CategoryPickerProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
      {categories.map((category) => {
        const selected = category.id === selectedId;
        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`w-24 items-center gap-1.5 rounded-xl border px-2 py-3 ${
              selected ? 'border-brand bg-emerald-50' : 'border-slate-200 bg-white'
            }`}
          >
            <CategoryIcon icon={category.icone} color={category.cor} size="sm" />
            <Text
              className={`text-center text-xs ${selected ? 'font-semibold text-brand' : 'text-slate-600'}`}
              numberOfLines={1}
            >
              {category.nome}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
