import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Text className="text-lg font-semibold text-slate-800">Dashboard</Text>
      <Link href="/transacao/nova" className="font-semibold text-brand">
        Nova movimentação
      </Link>
    </View>
  );
}
