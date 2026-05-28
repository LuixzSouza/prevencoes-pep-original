import { colors } from '../theme/tokens';
import {
  PreCPREAnswers,
  PostCPREAnswers,
  PreCPREResult,
  PostCPREResult,
  PreRiskLevel,
  PostRiskLevel,
  Question,
} from './types';

/**
 * LÓGICA CORRIGIDA:
 * Pré-CPRE: QUALQUER "Sim" = ALTO RISCO
 * Pós-CPRE: QUALQUER "Sim" = ALTO RISCO
 * Os critérios SÃO fatores de risco para PEP
 */

// ============= FUNÇÕES DE AVALIAÇÃO DE RISCO =============

export const isHighRiskPre = (answers: PreCPREAnswers): boolean => {
  return Object.values(answers).some(v => v === true);
};

export const isHighRiskPost = (answers: PostCPREAnswers): boolean => {
  return Object.values(answers).some(v => v === true);
};

// ============= AVALIADORES PRINCIPAIS =============

export const assessPreCPRERisk = (answers: PreCPREAnswers): PreCPREResult => {
  const isHighRisk = isHighRiskPre(answers);

  if (isHighRisk) {
    return {
      riskLevel: 'high',
      treatment: [
        'Iniciar Diclofenaco 100 mg via retal 10 minutos antes da CPRE +',
        'Associar Ringer com Lactato 3ml/kg durante a CPRE',
        '20 ml/kg até 1 hora após a CPRE e',
        '3ml/kg/h durante as próximas 8 horas após a CPRE'
      ],
      shouldProceedToPost: false, // Alto risco pré vai direto para resultado final
    };
  } else {
    return {
      riskLevel: 'low',
      treatment: [
        'Iniciar Diclofenaco 100 mg via retal 10 minutos antes da CPRE '
      ],
      shouldProceedToPost: true, // Baixo risco pré avalia fatores pós
    };
  }
};

export const assessPostCPRERisk = (answers: PostCPREAnswers): PostCPREResult => {
  const isHighRisk = isHighRiskPost(answers);

  if (isHighRisk) {
    return {
      riskLevel: 'high',
      treatment: [
        'Associar Ringer com Lactato na identificação do fator de alto risco:',
        '20ml/kg até 1 hora após a CPRE e',
        '3ml/kg/h durante as próximas 8 horas após a CPRE.'
      ],
    };
  } else {
    return {
      riskLevel: 'none',
      treatment: [
        'Manter somente Diclofenaco 100 mg via retal'
      ],
    };
  }
};

// ============= DADOS DAS PERGUNTAS =============

export const preAssessmentQuestions: Question[] = [
  {
    id: 'isFemale',
    text: 'Sexo feminino?',
  },
  {
    id: 'isYoung',
    text: 'Paciente jovem?',
    footnoteRef: '1',
  },
  {
    id: 'hasPEPHistory',
    text: 'PEP prévia?',
  },
  {
    id: 'hasPancreatitisHistory',
    text: 'Pancreatite aguda prévia?',
  },
  {
    id: 'hasNonDilatedDucts',
    text: 'Ductos não dilatados?',
    footnoteRef: '2',
  },
  {
    id: 'hasNormalBilirubin',
    text: 'Nível de bilirrubina normal?',
    footnoteRef: '3',
  },
];

export const postAssessmentQuestions: Question[] = [
  {
    id: 'hasDifficultCannulation',
    text: 'Canulação difícil?',
    footnoteRef: '*',
  },
  {
    id: 'hasContrastInjection',
    text: 'Injeção de contraste no ducto pancreático principal?',
  },
  {
    id: 'hasFistulotomy',
    text: 'Fistulotomia suprapapilar ou esfincterotomia transpancreática?',
  },
  {
    id: 'hasSphincterDysfunction',
    text: 'Disfunção do esfíncter de Oddi?',
    footnoteRef: '**',
  },
];

// ============= NOTAS DE RODAPÉ =============

export const footnotes = {
  '1': 'Paciente com idade menor ou igual a 30 anos.',
  '2': 'Ducto hepato-colédoco tendo diâmetro menor ou igual a 5 para sexo feminino e menor ou igual a 7 para sexo masculino.',
  '3': 'Bilirrubina total menor ou igual a 1,2.',
  '*': 'Canulação difícil: ≥ 5 min para canulação ou > 5 tentativas',
  '**': 'Papilite ou fibrose de papila vistos em colangiorressonância prévia',
};

// ============= HELPERS =============

export const getRiskLevelColor = (level: PreRiskLevel | PostRiskLevel): string => {
  switch (level) {
    case 'high':
      return colors.alert; // Alto risco -> vermelho
    case 'low':
      return colors.safe;  // Baixo risco -> cor segura (verde)
    case 'none':
      return colors.safe;  // Sem risco adicional -> verde
    default:
      return colors.safe;
  }
};

export const getRiskLevelText = (level: PreRiskLevel | PostRiskLevel): string => {
  switch (level) {
    case 'high':
      return 'Alto Risco';
    case 'low':
      return 'Baixo Risco';
    case 'none':
      return 'Sem Risco Adicional';
  }
};