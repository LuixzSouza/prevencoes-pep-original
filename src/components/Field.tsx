import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';

interface FieldProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  label,
  error,
  required = false,
  style,
  onFocus,
  onBlur,
  placeholderTextColor = '#9E9E9E', // Cor do placeholder padrão embutida
  ...textInputProps
}) => {
  // Controle de estado para saber se o campo está selecionado/focado
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={styles.container}>
      <Text 
        style={[
          styles.label, 
          isFocused && styles.labelFocused, // Muda a cor da label quando clica
          error && styles.labelError        // Muda a cor da label se tiver erro
        ]}
      >
        {label}
        
      </Text>

      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused, // Borda azul quando selecionado
          error && styles.inputError,       // Borda vermelha com erro
          style,                            // Permite customizações extras
        ]}
        placeholderTextColor={placeholderTextColor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.base,
  },
  label: {
    fontSize: typography.fontSize.sm, // Tamanho um pouco menor para ficar moderno
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink2, // Cor neutra por padrão
    marginBottom: spacing.xs,
    marginLeft: spacing.xs, // Leve recuo para alinhar com a curva do input
  },
  labelFocused: {
    color: colors.primary, // Fica azul quando o campo é clicado
  },
  labelError: {
    color: colors.alert,
  },
  required: {
    color: colors.alert,
  },
  input: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink,
    backgroundColor: '#ECF1FF', // Fundo azul claro que você pediu
    borderWidth: 2,
    borderColor: 'transparent', // Borda transparente por padrão para focar no fundo
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    minHeight: 52, // Altura igual à do PrimaryButton para manter proporção
  },
  inputFocused: {
    backgroundColor: colors.surface, // Fica branco ao digitar
    borderColor: colors.primary, // Borda azul
  },
  inputError: {
    backgroundColor: '#FFF0F0', // Fundo levemente vermelho
    borderColor: colors.alert, // Borda vermelha
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.alert,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});