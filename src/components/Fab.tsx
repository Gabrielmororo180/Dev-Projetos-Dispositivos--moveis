import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

interface FabProps {
  onPress: () => void;
  accessibilityLabel: string;
}

// Botão de ação flutuante, posicionado no canto inferior direito da tela pai.
export function Fab({ onPress, accessibilityLabel }: FabProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="absolute bottom-6 right-5 h-14 w-14 items-center justify-center rounded-full bg-brand shadow-lg active:bg-brand-dark"
    >
      <Ionicons name="add" size={28} color="#ffffff" />
    </Pressable>
  );
}
