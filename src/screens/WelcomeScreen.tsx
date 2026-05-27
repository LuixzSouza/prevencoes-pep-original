import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton } from '../components';
import { CheckCircle2, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react-native';

// Habilita animação de layout no Android (para o botão "Saiba mais" abrir suavemente)
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowInfo(!showInfo);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Destaque (Logo e Título) */}
        <View style={styles.heroSection}>
          <Image 
            source={require('../../assets/logo-blue.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleRegular}>Prevenção de Pancreatite</Text>
          <Text style={styles.titleBold}>Pós-CPRE</Text>
        </View>

        {/* Seção de Ação */}
        <View style={styles.actionSection}>
          <Text style={styles.instructionText}>
            Este sistema avalia o risco cirúrgico para CPRE.
            Para acessar informe seu CRC e senha
          </Text>

          <PrimaryButton
            title="Entrar"
            onPress={() => navigation.navigate('Login')}
          /> 
        </View>   
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Fundo branco
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing['4xl'], // Aumentei o padding de baixo para respirar melhor
    flexGrow: 1, // FlexGrow em vez de minHeight previne bugs de rolagem
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.xl,
  },
  titleRegular: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Texto em azul
    textAlign: 'center',
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  titleBold: {
    fontSize: typography.fontSize['4xl'],
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.primary, // Texto em azul com peso maior
    textAlign: 'center',
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  actionSection: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  instructionText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  toggleButton: {
    flexDirection: 'row', // Alinha o texto e o ícone lado a lado
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    gap: 4, // Espaço entre o texto e o ícone
  },
  toggleText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  infoSection: {
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.bg, // Fundo bege/cinza bem clarinho
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line, // Adiciona uma borda sutil
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.base,
  },
  featureList: {
    marginTop: spacing.md,
    gap: spacing.sm, // Dá um respiro entre os itens da lista
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    flex: 1, // Garante que o texto quebre a linha corretamente se não couber
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
  },
  disclaimer: {
    backgroundColor: '#ECF1FF', // Azul clarinho padrão do app para avisos
    borderRadius: borderRadius.base,
    padding: spacing.base,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // Borda lateral marcante
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  disclaimerBold: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
  },
  disclaimerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
});

export default WelcomeScreen;