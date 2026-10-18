import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title: string;
  action?: ReactNode;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

function CardRoot({ children, className = '' }: CardProps) {
  return (
    <View className={`rounded-2xl border border-slate-100 bg-white p-4 ${className}`}>
      {children}
    </View>
  );
}

function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-base font-semibold text-slate-800">{title}</Text>
      {action}
    </View>
  );
}

function CardBody({ children, className = '' }: CardSectionProps) {
  return <View className={className}>{children}</View>;
}

function CardFooter({ children, className = '' }: CardSectionProps) {
  return <View className={`mt-3 border-t border-slate-100 pt-3 ${className}`}>{children}</View>;
}

// Componente composto: <Card>, <Card.Header>, <Card.Body> e <Card.Footer>.
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
