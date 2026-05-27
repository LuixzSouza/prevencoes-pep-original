import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';

interface YesNoCardProps {
  question: string;
  value?: boolean;
  onValueChange: (value: boolean) => void;
  footnoteRef?: string;
}

export const YesNoCard: React.FC<YesNoCardProps> = ({
  question,
  value,
  onValueChange,
  footnoteRef,
}) => {
  // Criando os valores animados para o efeito de "afundar" o botão (Scale)
  const scaleYes = useRef(new Animated.Value(1)).current;
  const scaleNo = useRef(new Animated.Value(1)).current;

  // Função que faz o botão encolher levemente ao tocar
  const animatePressIn = (animValue: Animated.Value) => {
    Animated.spring(animValue, {
      toValue: 0.92, // Encolhe para 92% do tamanho
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  // Função que faz o botão voltar ao tamanho normal com um efeito elástico (spring)
  const animatePressOut = (animValue: Animated.Value) => {
    Animated.spring(animValue, {
      toValue: 1, // Volta para 100%
      useNativeDriver: true,
      friction: 4,
      tension: 50,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {question}
        {footnoteRef && <Text style={styles.footnoteRef}> {footnoteRef}</Text>}
      </Text>

      <View style={styles.buttonRow}>
        
        {/* BOTÃO SIM */}
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleYes }] }]}>
          <Pressable
            style={[
              styles.button,
              value === true && styles.buttonSelectedYes,
            ]}
            onPressIn={() => animatePressIn(scaleYes)}
            onPressOut={() => animatePressOut(scaleYes)}
            onPress={() => onValueChange(true)}
            accessibilityRole="button"
            accessibilityLabel={`Responder sim para: ${question}`}
          >
            <Text
              style={[
                styles.buttonText,
                value === true && styles.buttonTextSelected,
              ]}
            >
              Sim
            </Text>
          </Pressable>
        </Animated.View>

        {/* BOTÃO NÃO */}
        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleNo }] }]}>
          <Pressable
            style={[
              styles.button,
              value === false && styles.buttonSelectedNo,
            ]}
            onPressIn={() => animatePressIn(scaleNo)}
            onPressOut={() => animatePressOut(scaleNo)}
            onPress={() => onValueChange(false)}
            accessibilityRole="button"
            accessibilityLabel={`Responder não para: ${question}`}
          >
            <Text
              style={[
                styles.buttonText,
                value === false && styles.buttonTextSelected,
              ]}
            >
              Não
            </Text>
          </Pressable>
        </Animated.View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CAD6FF', // Fundo azul claro
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.base,
  },
  question: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Texto em Azul
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  footnoteRef: {
    color: colors.primary,
    fontFamily: typography.fontFamily.uiBold,
    fontSize: typography.fontSize.xs,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonWrapper: {
     minWidth: 90,
  alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: colors.surface, // Branco padrão
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 44,
    maxWidth: 58,
  },
  buttonSelectedYes: {
    backgroundColor: colors.safe, // VERDE quando selecionado
    borderColor: colors.safe,
    maxWidth: 58,
  },
  buttonSelectedNo: {
    backgroundColor: colors.alert, // VERMELHO quando selecionado
    borderColor: colors.alert,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Azul padrão
  },
  buttonTextSelected: {
    color: colors.surface, // Branco quando selecionado (serve para ambos)
  },
});