import { Pressable, Text, View } from 'react-native';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipsProps<T extends string> {
  options: FilterOption<T>[];
  selected: T;
  onChange: (value: T) => void;
}

export function FilterChips<T extends string>({
  options,
  selected,
  onChange,
}: FilterChipsProps<T>) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const active = option.value === selected;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            className={`rounded-full border px-4 py-2 ${
              active ? 'border-brand bg-brand' : 'border-slate-200 bg-white'
            }`}
          >
            <Text className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-600'}`}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
