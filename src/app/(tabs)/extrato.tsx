import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function ExtratoScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Text className="text-lg font-semibold text-slate-800">Extrato</Text>
      <Link
        href={{ pathname: '/transacao/[id]', params: { id: '1' } }}
        className="font-semibold text-brand"
      >
        Ver transação de exemplo
      </Link>
    </View>
  );
}
