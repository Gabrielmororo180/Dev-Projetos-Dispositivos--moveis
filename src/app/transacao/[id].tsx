import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function DetalheTransacaoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-lg font-semibold text-slate-800">Transação #{id}</Text>
    </View>
  );
}
