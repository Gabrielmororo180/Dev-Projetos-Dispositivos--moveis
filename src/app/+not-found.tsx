import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Text className="text-lg font-semibold text-slate-800">Esta tela não existe.</Text>
      <Link href="/" className="font-semibold text-brand">
        Voltar para o início
      </Link>
    </View>
  );
}
