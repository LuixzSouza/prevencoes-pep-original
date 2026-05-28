import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, ResultCard } from '../components';
import { AlertTriangle, CheckCircle } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PostResult'>;

const PostResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { result } = route.params;

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

  const getRiskMessage = () => {
    if (result.riskLevel === 'high') {
      return {
        title: 'Fatores de risco identificados',
        message: 'Foram identificados fatores de risco intraoperatórios que requerem tratamento adicional com hidratação.',
        color: colors.alert,
        Icon: AlertTriangle,
      };
    }

    return {
      title: 'Nenhum fator adicional',
      message: 'Não foram identificados fatores de risco adicionais durante o procedimento. Manter apenas o protocolo pré-CPRE.',
      color: colors.safe,
      Icon: CheckCircle,
    };
  };

  const riskInfo = getRiskMessage();
  const RiskIcon = riskInfo.Icon;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultGroup}>
          <ResultCard
            riskLevel={result.riskLevel}
            treatment={result.treatment}
            title="Indicação"
          />


          <View style={styles.actions}>
            <PrimaryButton
              title="Finalizar"
              onPress={handleNewAssessment}
              variant="primary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  resultGroup: {
    gap: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.bg,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    borderLeftWidth: 4,
  },
  summaryTitle: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiExtraBold,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  actions: {
    paddingHorizontal: spacing.lg,
  },
});

export default PostResultScreen;
