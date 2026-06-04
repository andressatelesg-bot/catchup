# Catchup — Finanças Pessoais

App de controle financeiro pessoal (PWA).

## Deploy no Vercel

1. Faça upload destes arquivos no GitHub
2. Acesse [vercel.com](https://vercel.com) → Import from GitHub
3. Selecione o repositório → Deploy

## Atualizar o app

1. Gere novo `index.html` com as correções
2. Substitua o arquivo no GitHub
3. Vercel atualiza automaticamente em ~30s
4. **Importante**: incremente `CACHE_VERSION` no `sw.js` (ex: `catchup-v2`) para forçar atualização nos celulares

## Estrutura

```
index.html    ← app completo (HTML + CSS + JS)
manifest.json ← configuração PWA
sw.js         ← service worker (cache offline)
icon-192.png  ← ícone do app
icon-512.png  ← ícone do app (alta resolução)
README.md     ← este arquivo
```

## Instalar no celular

**Android (Chrome):**
Abra o site → Menu ⋮ → "Adicionar à tela inicial"

**iOS (Safari):**
Abra o site → Compartilhar → "Adicionar à tela de início"
