# 🚀 Guia de Deploy

## Deploy no Vercel

### Método 1: Via GitHub (Recomendado)

1. **Criar repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/echo-web.git
   git push -u origin main
   ```

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Add New Project"
   - Importe seu repositório do GitHub
   - O Vercel detectará automaticamente como projeto Vite/React
   - Clique em "Deploy"

3. **Configuração Automática**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   
   O Vercel configura isso automaticamente!

### Método 2: Via Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Fazer deploy
vercel

# Deploy para produção
vercel --prod
```

## Deploy em Outros Provedores

### Netlify

1. Conecte o repositório GitHub
2. Configurações:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Cloudflare Pages

1. Conecte o repositório GitHub
2. Configurações:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### Render

1. Crie um novo "Static Site"
2. Conecte seu repositório
3. Configurações:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

## ✅ Checklist Antes do Deploy

- [ ] Testar localmente com `npm run build`
- [ ] Verificar se o build gera a pasta `dist/`
- [ ] Testar com `npm run preview`
- [ ] Verificar links de contato no código
- [ ] Verificar se não há erros no console
- [ ] Verificar responsividade em mobile

## 🔧 Troubleshooting

### Build falha no Vercel

- Verifique se todas as dependências estão no `package.json`
- Verifique se não há imports de módulos não instalados
- Veja os logs de build no Vercel para detalhes

### Erro de path aliases (@/)

O projeto usa path aliases configurados no `vite.config.ts` e `tsconfig.json`. O Vercel deve lidar com isso automaticamente, mas se houver problemas, verifique essas configurações.

### CSS não carrega

Verifique se o `main.tsx` importa o `globals.css`:
```typescript
import './styles/globals.css'
```

## 📝 Notas

- O Vercel detecta automaticamente projetos Vite/React
- Não é necessário arquivo `vercel.json` para este projeto
- O deploy é automático a cada push no branch principal
- Preview deployments são criados automaticamente para PRs
