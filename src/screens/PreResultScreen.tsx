import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, ResultCard } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'PreResult'>;

const PreResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { result } = route.params;

  const handleNext = () => {
    if (result.shouldProceedToPost) {
      navigation.navigate('PostAssessment');
    } else {
      navigation.popToTop();
    }
  };

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

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
            {result.shouldProceedToPost ? (
              <PrimaryButton
                title="Avançar"
                onPress={handleNext}
                variant="primary"
              />
            ) : (
              <PrimaryButton
                title="Finalizar"
                onPress={handleNewAssessment}
                variant="primary"
              />
            )}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  resultGroup: {
    gap: spacing.lg,
  },
  actions: {
    paddingHorizontal: spacing.lg,
  },
});

export default PreResultScreen;
