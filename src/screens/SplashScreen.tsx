import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // <-- Importante para controlar a cor da bateria/hora
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';

// --- Componente de Animação Customizada (Loader) ---
const PulseLoader = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value) => {
      return Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.stagger(200, [
        createAnimation(dot1),
        createAnimation(dot2),
        createAnimation(dot3),
      ])
    ).start();
  }, [dot1, dot2, dot3]);

  const getDotStyle = (animValue: Animated.Value) => ({
    opacity: animValue,
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0.3, 1],
          outputRange: [0.8, 1.3],
        }),
      },
    ],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View style={[styles.dot, getDotStyle(dot1)]} />
      <Animated.View style={[styles.dot, getDotStyle(dot2)]} />
      <Animated.View style={[styles.dot, getDotStyle(dot3)]} />
    </View>
  );
};

// --- Tela Principal de Splash ---
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  // Animações de entrada do conteúdo principal
  const fadeAnim = useRef(new Animated.Value(0)).current; // Começa invisível
  const slideAnim = useRef(new Animated.Value(30)).current; // Começa 30px abaixo

  useEffect(() => {
    // 1. Dispara a animação de entrada suave (Fade In + Slide Up)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Timer para trocar de tela
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, slideAnim]);

  return (
    <View style={styles.container}>
      {/* Força os ícones do celular (bateria/hora) a ficarem brancos sobre o fundo azul */}
      <StatusBar style="light" />

      {/* Usamos Animated.View para aplicar as animações de entrada em todo o bloco */}
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim, 
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Image 
          source={require('../../assets/logo-white.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Prevenção de Pancreatite{'\n'}Pós-CPRE
        </Text>

        <PulseLoader />
      </Animated.View>

      <Text style={styles.footer}>
        Versão 1.0.0
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'space-between',
    paddingVertical: spacing['5xl'],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: spacing['2xl'],
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.surface,
    textAlign: 'center',
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
    marginBottom: spacing.lg,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing['4xl'],
  },
  loaderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  footer: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default SplashScreen;