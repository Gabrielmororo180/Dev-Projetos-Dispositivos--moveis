import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { CategoryPicker } from '@/components/CategoryPicker';
import { FilterChips, type FilterOption } from '@/components/FilterChips';
import { FormField } from '@/components/FormField';
import { colors } from '@/constants/theme';
import { useFinanceStore } from '@/store/useFinanceStore';
import type { TransactionType } from '@/types/finance';
import { formatBRDate, maskBRDate, parseBRDate, toISODate } from '@/utils/date';
import { formatCurrency, parseCurrencyInput } from '@/utils/format';

const TYPE_OPTIONS: FilterOption<TransactionType>[] = [
  { value: 'despesa', label: 'Despesa' },
  { value: 'receita', label: 'Receita' },
];

const inputClassName = 'rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800';

type FormErrors = Partial<Record<'valor' | 'descricao' | 'categoria' | 'data', string>>;

export default function NovaTransacaoScreen() {
  const params = useLocalSearchParams<{ tipo?: string }>();
  const categories = useFinanceStore((state) => state.categories);
  const addTransaction = useFinanceStore((state) => state.addTransaction);

  const [tipo, setTipo] = useState<TransactionType>(
    params.tipo === 'receita' ? 'receita' : 'despesa',
  );
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [categoriaId, setCategoriaId] = useState<number>();
  const [data, setData] = useState(formatBRDate(toISODate(new Date())));
  const [pago, setPago] = useState(true);
  const [observacao, setObservacao] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const categoriesOfType = useMemo(
    () => categories.filter((category) => category.tipo === tipo),
    [categories, tipo],
  );

  const changeTipo = (value: TransactionType) => {
    setTipo(value);
    setCategoriaId(undefined);
  };

  // Validação básica dos campos obrigatórios; os schemas Zod entram na Sprint 5.
  const handleSubmit = () => {
    const isoDate = parseBRDate(data);
    const nextErrors: FormErrors = {};
    if (valor <= 0) nextErrors.valor = 'Informe um valor maior que zero.';
    if (descricao.trim().length < 3) nextErrors.descricao = 'Descreva com pelo menos 3 letras.';
    if (!categoriaId) nextErrors.categoria = 'Selecione uma categoria.';
    if (!isoDate) nextErrors.data = 'Use uma data válida no formato DD/MM/AAAA.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !isoDate || !categoriaId) return;

    addTransaction({
      tipo,
      valor,
      descricao: descricao.trim(),
      categoria_id: categoriaId,
      data: isoDate,
      status: pago ? 'pago' : 'pendente',
      observacao: observacao.trim() || null,
    });
    router.back();
  };

  const isIncome = tipo === 'receita';

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerClassName="gap-5 p-4 pb-10" keyboardShouldPersistTaps="handled">
        <FilterChips options={TYPE_OPTIONS} selected={tipo} onChange={changeTipo} />

        <FormField label={isIncome ? 'Valor da receita' : 'Valor da despesa'} error={errors.valor}>
          <TextInput
            value={formatCurrency(valor)}
            onChangeText={(text) => setValor(parseCurrencyInput(text))}
            keyboardType="number-pad"
            className={`rounded-xl border border-slate-200 bg-white px-4 py-3 text-2xl font-bold ${
              isIncome ? 'text-income' : 'text-expense'
            }`}
          />
        </FormField>

        <FormField label="Descrição" error={errors.descricao}>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            placeholder={isIncome ? 'Ex: Salário' : 'Ex: Supermercado'}
            placeholderTextColor={colors.textMuted}
            className={inputClassName}
          />
        </FormField>

        <FormField label="Categoria" error={errors.categoria}>
          <CategoryPicker
            categories={categoriesOfType}
            selectedId={categoriaId}
            onSelect={setCategoriaId}
          />
        </FormField>

        <FormField label="Data" error={errors.data} hint="Formato DD/MM/AAAA">
          <TextInput
            value={data}
            onChangeText={(text) => setData(maskBRDate(text))}
            keyboardType="number-pad"
            maxLength={10}
            className={inputClassName}
          />
        </FormField>

        <View className="flex-row items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
          <View className="flex-1 pr-3">
            <Text className="font-medium text-slate-800">
              {isIncome ? 'Já foi recebido?' : 'Já está pago?'}
            </Text>
            <Text className="text-xs text-slate-400">
              {pago ? 'Entra no saldo imediatamente' : 'Fica como pendente'}
            </Text>
          </View>
          <Switch
            value={pago}
            onValueChange={setPago}
            trackColor={{ true: colors.brand, false: colors.border }}
            thumbColor={colors.surface}
          />
        </View>

        <FormField label="Observação (opcional)">
          <TextInput
            value={observacao}
            onChangeText={setObservacao}
            placeholder="Detalhes adicionais"
            placeholderTextColor={colors.textMuted}
            multiline
            className={`${inputClassName} min-h-20`}
            textAlignVertical="top"
          />
        </FormField>

        <View className="gap-3">
          <Pressable
            onPress={handleSubmit}
            accessibilityRole="button"
            className="items-center rounded-xl bg-brand py-4 active:bg-brand-dark"
          >
            <Text className="text-base font-semibold text-white">Confirmar lançamento</Text>
          </Pressable>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            className="items-center py-2"
          >
            <Text className="font-medium text-slate-500">Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
