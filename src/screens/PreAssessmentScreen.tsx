import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList, PreCPREAnswers } from '../logic/types';
import { YesNoCard, PrimaryButton, Stepper, FootnoteCard } from '../components';
import { preAssessmentQuestions, assessPreCPRERisk } from '../logic/riskEngine';

type Props = NativeStackScreenProps<RootStackParamList, 'PreAssessment'>;

const PreAssessmentScreen: React.FC<Props> = ({ navigation }) => {
  const [answers, setAnswers] = useState<Partial<PreCPREAnswers>>({});

  const handleAnswerChange = (questionId: keyof PreCPREAnswers, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isComplete = () => {
    return preAssessmentQuestions.every(q =>
      answers[q.id as keyof PreCPREAnswers] !== undefined
    );
  };

  const handleContinue = () => {
    if (!isComplete()) return;

    const completeAnswers = answers as PreCPREAnswers;
    const result = assessPreCPRERisk(completeAnswers);

    navigation.navigate('PreResult', {
      answers: completeAnswers,
      result,
    });
  };

  // Coletar referências de notas de rodapé presentes
  const footnoteRefs = preAssessmentQuestions
    .map(q => q.footnoteRef)
    .filter((ref): ref is string => ref !== undefined);

  return (
    <View style={styles.container}>
      {/* <Stepper
        currentStep={1}
        totalSteps={2}
        labels={['Avaliação Pré-CPRE', 'Resultado']}
      /> */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pré-CPRE</Text>
          {/* <Text style={styles.subtitle}>
            Responda às perguntas abaixo para avaliar o risco de pancreatite pós-CPRE
          </Text> */}
        </View>

        <View style={styles.questionsContainer}>
          {preAssessmentQuestions.map((question) => (
            <YesNoCard
              key={question.id}
              question={question.text}
              footnoteRef={question.footnoteRef}
              value={answers[question.id as keyof PreCPREAnswers]}
              onValueChange={(value) =>
                handleAnswerChange(question.id as keyof PreCPREAnswers, value)
              }
            />
          ))}
        </View>

        <FootnoteCard references={footnoteRefs} />

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Continuar"
          onPress={handleContinue}
          disabled={!isComplete()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Fundo Branco
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Mudei para azul para combinar com o tema limpo
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
    marginTop: spacing['5xl'], // Espaçamento maior no topo para destacar o conteúdo
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  questionsContainer: {
    marginBottom: spacing.lg,
    gap: spacing.md, // Adiciona um espaçamento legal entre os cards
  },
  progressInfo: {
    backgroundColor: colors.bg, // Fundo levemente cinza/creme para destacar do branco
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  progressText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    color: colors.ink2,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
});

export default PreAssessmentScreen;