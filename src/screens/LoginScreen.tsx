import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { RootStackParamList, LoginData } from '../logic/types';
import { PrimaryButton, Field } from '../components';
import { ChevronLeft } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<LoginData>({
    crc: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.crc.trim()) {
      newErrors.crc = 'CRC é obrigatório';
    } else if (!/^\d{4,6}$/.test(formData.crc.trim())) {
      newErrors.crc = 'CRC deve ter entre 4 e 6 dígitos';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Senha deve ter pelo menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simular delay de autenticação
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Login mock - aceita qualquer CRC válido com senha "1234"
      if (formData.password === '1234') {
        const loginInfo = {
          crc: formData.crc,
          loginTime: new Date().toISOString(),
        };

        await AsyncStorage.setItem('userLogin', JSON.stringify(loginInfo));
        navigation.replace('PreAssessment');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Use senha "1234" para teste.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Esqueci minha senha',
      'Em um ambiente de produção, aqui seria redirecionado para recuperação de senha.\n\nPara teste, use senha "1234".',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Barra Superior com Voltar e Logo */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <ChevronLeft color={colors.primary} size={24} />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <Image 
            source={require('../../assets/logo-blue.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Entrar</Text>
        </View>

        <View style={styles.form}>
          <Field
            label="CRC"
            placeholder="Digite seu CRC"
            placeholderTextColor="#9E9E9E"
            value={formData.crc}
            onChangeText={(text) => setFormData(prev => ({ ...prev, crc: text }))}
            error={errors.crc}
            keyboardType="numeric"
            maxLength={6}
            required
            autoComplete="username"
            textContentType="username"
            style={{ backgroundColor: '#ECF1FF' }}
          />

          <View style={styles.fieldSpacing} />

          <Field
            label="Senha"
            placeholder="Digite sua senha"
            placeholderTextColor="#9E9E9E"
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
            error={errors.password}
            secureTextEntry
            required
            autoComplete="current-password"
            textContentType="password"
            style={{ backgroundColor: '#ECF1FF' }}
          />

          {/* <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            accessibilityRole="button"
            accessibilityLabel="Esqueci minha senha"
          > 
            <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="Entrar"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            // style={styles.loginButton}
          />

          <Text
            style={styles.skipText}
            onPress={() => navigation.navigate('PreAssessment')}
            accessibilityRole="button"
            accessibilityLabel="Pular login"
          >
            Pular login
          </Text>
        </View>

        {/* <View style={styles.testInfo}>
          <Text style={styles.testTitle}>Informações para teste:</Text>
          <Text style={styles.testText}>• CRC: Qualquer número de 4-6 dígitos</Text>
          <Text style={styles.testText}>• Senha: 1234</Text>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Fundo principal Branco
  },
  scrollView: {
    // Não força o ScrollView a ocupar toda a altura da tela
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    marginTop: spacing['2xl'],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    marginLeft: -spacing.xs, // Puxa levemente para a esquerda para alinhar visualmente
  },
  backText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
    marginLeft: 4,
  },
  logo: {
    width: 40,
    height: 40,
  },
  header: {
    alignItems: 'center', // Alinhado à esquerda para dar um visual mais moderno e limpo
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.primary, // Azul
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
  },
  form: {
    // Fundo branco sem sombras, totalmente integrado à tela
    backgroundColor: 'transparent', 
    marginBottom: spacing.lg,
    
  },
  fieldSpacing: {
    height: spacing.lg,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
  },
  testInfo: {
    backgroundColor: colors.line,
    borderRadius: borderRadius.base,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  testTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  testText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    alignItems: 'center',
    marginBottom: 0,
  },
  loginButton: {
    minHeight: 44,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing['2xl'],
  },
  skipText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    textDecorationLine: 'underline',
    color: colors.primary, 
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
});

export default LoginScreen;