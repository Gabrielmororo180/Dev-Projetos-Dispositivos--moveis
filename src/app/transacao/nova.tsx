import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function NovaTransacaoScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-4">
      <Text className="text-lg font-semibold text-slate-800">Formulário de nova movimentação</Text>
      <Pressable onPress={() => router.back()} className="rounded-xl bg-brand px-6 py-3">
        <Text className="font-semibold text-white">Fechar</Text>
      </Pressable>
    </View>
  );
}
