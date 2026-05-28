# Prevenção de Pancreatite Pós-CPRE

Aplicativo mobile para estratificação de risco e prevenção de pancreatite pós-CPRE (PEP).

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npx expo start

# Para executar em dispositivos específicos
npx expo start --android  # Android
npx expo start --ios      # iOS  
npx expo start --web      # Web
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📱 Funcionalidades

- **Avaliação Pré-CPRE**: 6 critérios de risco baseados no fluxograma clínico
- **Avaliação Pós-CPRE**: 4 fatores intraoperatórios de risco
- **Protocolos de tratamento**: Diclofenaco + hidratação personalizada
- **Interface acessível**: Contraste AA, tamanho de fonte ≥14sp, área de toque ≥44pt
- **Login mock**: CRC + senha para teste (senha: "1234")

## 🏗️ Arquitetura

```
/src
  /screens       # 8 telas do app
  /components    # Componentes reutilizáveis
  /theme        # Design system (cores, tipografia, espaçamentos)
  /logic        # riskEngine (lógica pura testável)
  /navigation   # Navegação com React Navigation
```

## 🎨 Design System

- **Paleta**: ink, primary (#1B4D7A), alert (#C84A3D), safe (#3F8F6E)
- **Tipografia**: Plus Jakarta Sans (UI) + Geist Mono (metadados)
- **Cantos**: 16px (cards), 14px (botões)

## 🧠 Lógica Clínica

**Pré-CPRE**: QUALQUER "Sim" = ALTO RISCO  
**Pós-CPRE**: QUALQUER "Sim" = ALTO RISCO

### Critérios Pré-CPRE
1. Sexo feminino
2. Paciente jovem (≤30 anos)
3. PEP prévia
4. Pancreatite aguda prévia
5. Ductos não dilatados (≤5mm ♀/≤7mm ♂)
6. Bilirrubina normal (≤1.2 mg/dL)

### Fatores Pós-CPRE
1. Canulação difícil (≥5 min ou >5 tentativas)
2. Injeção contraste no ducto pancreático principal
3. Fistulotomia suprapapilar/esfincterotomia transpancreática
4. Disfunção esfíncter Oddi (papilite/fibrose)

## 📋 Condutas

- **Alto risco pré**: Diclofenaco + Ringer Lactato completo
- **Baixo risco pré**: Diclofenaco → avaliar pós-CPRE
- **Alto risco pós**: Adicionar hidratação
- **Sem risco adicional**: Manter apenas Diclofenaco

## 🔧 Tecnologias

- React Native + Expo
- TypeScript
- React Navigation
- AsyncStorage
- Jest (testes)
- Google Fonts

## 📝 Notas de Desenvolvimento

- Login mock: qualquer CRC (4-6 dígitos) + senha "1234"
- Sem backend real - apenas AsyncStorage local
- Lógica clínica baseada no fluxograma PDF oficial
- Testes unitários cobrem todos os cenários do fluxograma

![Imagem1](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img1.jpg)
![Imagem2](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img2.jpg)
![Imagem3](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img3.jpg)
![Imagem4](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img4.jpg)
![Imagem5](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img5.jpg)
![Imagem6](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img6.jpg)
![Imagem7](https://raw.githubusercontent.com/LuixzSouza/prevencoes-pep-original/refs/heads/main/Pictures/img7.jpg)
