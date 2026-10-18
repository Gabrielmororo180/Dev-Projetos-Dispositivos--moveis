import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import type { CategoryIcon as CategoryIconName } from '@/types/finance';

interface CategoryIconProps {
  icon: CategoryIconName;
  color: string;
  size?: 'sm' | 'md';
}

const sizes = {
  sm: { box: 'h-9 w-9', icon: 18 },
  md: { box: 'h-11 w-11', icon: 22 },
};

export function CategoryIcon({ icon, color, size = 'md' }: CategoryIconProps) {
  return (
    <View
      className={`items-center justify-center rounded-full ${sizes[size].box}`}
      // Fundo com a cor da categoria em 15% de opacidade (sufixo hexadecimal 26).
      style={{ backgroundColor: `${color}26` }}
    >
      <Ionicons name={icon} size={sizes[size].icon} color={color} />
    </View>
  );
}
