import { View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 a 1; valores acima de 1 preenchem a barra inteira
  barClassName?: string;
  color?: string;
}

export function ProgressBar({ progress, barClassName = 'bg-brand', color }: ProgressBarProps) {
  const width = `${Math.min(Math.max(progress, 0), 1) * 100}%` as const;

  return (
    <View className="h-2 overflow-hidden rounded-full bg-slate-100">
      <View
        className={`h-full rounded-full ${color ? '' : barClassName}`}
        style={{ width, backgroundColor: color }}
      />
    </View>
  );
}
