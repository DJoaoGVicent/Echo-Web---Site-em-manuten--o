# Echo In Web

Um website de manutenção com estética retro CRT dos anos 80, inspirado em terminais antigos com tema amarelo-branco fosfórico.

## 🎨 Características

- **Estética CRT autêntica** - Efeitos de scanlines, flickering e brilho fosfórico
- **Animação estilo anos 80** - Sequência de inicialização linha por linha
- **Tema amarelo-branco** - Cores fosfóricas reminiscentes de monitores antigos
- **Responsivo** - Funciona em todos os dispositivos
- **Tipo letra monoespaçada** - Courier New para autenticidade

## 🚀 Tecnologias

- **React 18** - Framework frontend
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes UI

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🎯 Funcionalidades

### Sequência de Inicialização
- Animação estilo boot dos anos 80
- Mensagens com delay realista
- Aguarda interação do usuário para continuar

### Página de Manutenção
- Animação linha por linha dos conteúdos
- Relógio em tempo real
- Links de contato com hover effects
- Botões de controle de janela (macOS style)

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Conecte seu repositório ao Vercel
3. O Vercel detecta automaticamente Vite/React
4. Deploy automático a cada push

O projeto está configurado para funcionar automaticamente no Vercel sem configuração adicional.

### Outros Provedores

O projeto pode ser deployado em qualquer plataforma que suporte aplicações Node.js:
- Netlify
- Cloudflare Pages
- Railway
- Render

## 📝 Estrutura do Projeto

```
echo-web/
├── components/          # Componentes React
│   ├── MaintenancePage.tsx
│   └── StartupSequence.tsx
├── styles/             # Estilos globais
│   └── globals.css
├── ui/                 # Componentes UI (shadcn/ui)
├── App.tsx            # Componente principal
├── main.tsx           # Entry point
└── vite.config.ts     # Configuração do Vite
```

## 🎨 Personalização

### Ajustar Links de Contato

Edite `components/MaintenancePage.tsx`:

```typescript
const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/seuusuario',
    icon: '⟦ ⟧',
    color: '#39FF14'
  },
  // Adicione mais links...
];
```

### Ajustar Mensagens

Edite o array `CONTENT_LINES` em `components/MaintenancePage.tsx` e `STARTUP_MESSAGES` em `components/StartupSequence.tsx`.

## 📄 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- Componentes UI do [shadcn/ui](https://ui.shadcn.com/)
- Ícones do [lucide-react](https://lucide.dev/)
