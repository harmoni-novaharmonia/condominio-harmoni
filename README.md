# Condomínio Harmoni

Site `condominioharmoni.com.br`: vitrine com todos os Harmonis da Nova Harmonia + uma landing page por empreendimento (`/jardins`, `/arbore`, `/vale`...).

- Stack: Next.js + TypeScript + Tailwind v4 + shadcn/ui + GSAP, export estático
- Hospedagem: Hostinger Cloud Enterprise (conteúdo de `out/` sobe para `public_html`)
- Plano e decisões: `docs/PLANO.md`

Regra de ouro: nenhuma string de conteúdo dentro de componentes. Tudo em `src/empreendimentos/<slug>/dados.ts`.

Comandos:

```bash
npm install
npm run dev      # localhost:3000
npm run build    # gera out/
```
