import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { RootStackParamList, PostCPREAnswers } from '../logic/types';
import { YesNoCard, PrimaryButton, Stepper, FootnoteCard } from '../components';
import { postAssessmentQuestions, assessPostCPRERisk } from '../logic/riskEngine';
import { Info } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PostAssessment'>;

const PostAssessmentScreen: React.FC<Props> = ({ navigation }) => {
  const [answers, setAnswers] = useState<Partial<PostCPREAnswers>>({});

  const handleAnswerChange = (questionId: keyof PostCPREAnswers, value: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const isComplete = () => {
    return postAssessmentQuestions.every(q =>
      answers[q.id as keyof PostCPREAnswers] !== undefined
    );
  };

  const handleContinue = () => {
    if (!isComplete()) return;

    const completeAnswers = answers as PostCPREAnswers;
    const result = assessPostCPRERisk(completeAnswers);

    navigation.navigate('PostResult', {
      answers: completeAnswers,
      result,
    });
  };

  // Coletar referências de notas de rodapé presentes
  const footnoteRefs = postAssessmentQuestions
    .map(q => q.footnoteRef)
    .filter((ref): ref is string => ref !== undefined);

  return (
    <View style={styles.container}>
      {/* <Stepper
        currentStep={3}
        totalSteps={4}
        labels={['Pré-CPRE', 'Resultado Pré', 'Pós-CPRE', 'Resultado Final']}
      /> */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Avaliação Intraoperatória</Text>
          {/* <Text style={styles.subtitle}>
            Identifique os fatores de risco que ocorreram durante o procedimento
          </Text> */}
        </View>

        {/* Card de Aviso Melhorado */}
        {/* <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Info color={colors.primary} size={18} />
            <Text style={styles.infoTitle}>Importante</Text>
          </View>
          <Text style={styles.infoText}>
            Esta avaliação deve ser realizada durante ou imediatamente após
            o procedimento de CPRE, baseada nos eventos intraoperatórios observados.
          </Text>
        </View> */}

        <View style={styles.questionsContainer}>
          {postAssessmentQuestions.map((question) => (
            <YesNoCard
              key={question.id}
              question={question.text}
              footnoteRef={question.footnoteRef}
              value={answers[question.id as keyof PostCPREAnswers]}
              onValueChange={(value) =>
                handleAnswerChange(question.id as keyof PostCPREAnswers, value)
              }
            />
          ))}
        </View>

        <FootnoteCard references={footnoteRefs} />

      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Ver Resultado Final"
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
    marginBottom: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Azul para manter o padrão
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
  infoCard: {
    backgroundColor: '#ECF1FF', // Fundo azul claro para combinar com o aviso da tela final
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  infoTitle: {
    fontSize: typography.fontSize.sm, // Tamanho sutil mas destacado pelo Bold
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Azul para combinar com o ícone
  },
  infoText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  questionsContainer: {
    marginBottom: spacing.lg,
    gap: spacing.md, // Espaçamento harmônico entre os cards de Sim/Não
  },
  progressInfo: {
    backgroundColor: colors.bg, // Fundo cinza/creme claro para destacar no fundo branco
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

export default PostAssessmentScreen;