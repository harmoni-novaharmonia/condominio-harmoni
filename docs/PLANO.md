# Plano — condominio-harmoni

Atualizado em 04/10/2026. Status: planejamento (nenhum código escrito).

## 1. Decisões já tomadas

| Tema | Decisão |
|---|---|
| Stack | Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui + GSAP, export estático |
| Repositório | Um só: `condominio-harmoni` |
| Rotas | `/` vitrine; `/<slug>` para cada LP, no domínio `condominioharmoni.com.br` |
| Menu padrão | Localização · Perspectivas · Implantação · Diferenciais · Contato |
| Ordem | 1) vitrine pronta e limpa 2) refazer LP Vinhedos 3) derivar as outras |
| Escopo | 14 LPs |

## 2. Mapa dos empreendimentos (o que existe na pasta Nova Harmonia)

Fonte: pasta `Nova Harmonia`, docs do Dashboard, copys recebidas. Marcado ⚠ onde há inconsistência.

| Slug sugerido | Empreendimento | Cidade | Material na pasta | Observação |
|---|---|---|---|---|
| vinhedos | Harmoni Vinhedos (Condomínio Harmoni) | Viamão/RS | `harmoni/` (11 renders, masterplan, localização), logo | Única com fotos/renders próprios. Hoje é a LP em WordPress |
| jardins | Harmoni Jardins | Cachoeirinha/RS | `sites/harmoni-jardins`, `Novas Landing Pages/Harmoni Jardins` (logos SVG, KV, copy cards) | Já existe projeto Next. É a LP-base das novas (copys dizem "pega a do Jardins e troca") |
| arbore | Harmoni Árbore | Cachoeirinha/RS | logos SVG, manual, book, copy LP | Copy pronta (textos a trocar sobre o Jardins) |
| vale | Harmoni Vale | Gravataí/RS | logos, manual, copy LP (txt) | Copy pronta |
| essenza | Harmoni Essenza | ⚠ ver abaixo | logos, manual, book, copy do book | Copy fala Cachoeirinha no título, mas o texto cita RS-118, ULBRA, Park Shopping Canoas, 20 min da capital |
| hortensias | Harmoni Hortênsias | ? | nada encontrado | Só aparece no HTML da vitrine; sem logo SVG ("trocar pelo SVG quando existir") |
| parque-harmonia-canoas | Parque Harmonia Canoas | Canoas/RS | manual de marca, 36 SVGs, fontes ttf | Marca própria (Quero-Quero + Aroeira) |
| reserva-do-parque | Reserva do Parque | ⚠ Gravataí/RS (pasta e manual) vs Rio Verde/GO (Dashboard) | manual, logos, copy LP | Copy também é "pega a do Jardins e troca" |
| parque-harmonia-viamao | Parque Harmonia Viamão | Viamão/RS | `hoje/parque harmonia viamao` (muitas fotos), capa | Em obra |
| outros | The One (Raposa/MA), Vila Imperial e Reserva dos Babaçus (Teresina/PI), Reserva Harmonia Paço do Lumiar (MA), Caruaru (PE), São Mateus (ES), Moradas do Rio Corda (Barra do Corda/MA), Morada dos Pássaros (Araguaína/TO), Reserva das Flores (Timon/MA) | | Pastas com renders, implantação, mapa, logo | Todos têm LP no WordPress hoje |

Dashboard lista 18 empreendimentos no total. **Preciso que você diga quais são as 14 LPs** (ver perguntas na seção 7).

## 3. Arquitetura

### Núcleo compartilhado
`components/` (Header, Footer, FormLead, Modal, Galeria, Mapa) e `secoes/` base (Hero, Localizacao, Perspectivas, Implantacao, Diferenciais, Contato). Não têm texto dentro.

### Por empreendimento
`src/empreendimentos/<slug>/dados.ts` define: identidade (nome, cidade, status, tema), SEO, contatos, imagens, textos, e **a lista ordenada de seções** que a LP usa. Seção exclusiva fica em `empreendimentos/<slug>/secoes/`.

### Tema por empreendimento
Tailwind v4 `@theme` com tokens (`--color-fundo`, `--color-marca`, `--color-destaque`...). Cada LP aplica `data-tema="<slug>"` e troca a paleta sem tocar nos componentes. Fonte da paleta: manual de marca de cada Harmoni (Árbore, Essenza, Canoas e Reserva do Parque têm manual em PDF; Jardins tem PPTX).

### Como cada Harmoni ganha seções diferentes
Biblioteca de seções com variantes (ex.: `Hero` em 3 layouts, `Diferenciais` em grade/lista/carrossel). A LP escolhe variante + ordem em `dados.ts`. Seção totalmente nova entra no núcleo se servir a mais de uma LP; senão fica na pasta do empreendimento.

### Vitrine (`/`) a partir do HTML que você mandou
O HTML atual é um bloco único (CSS + JS + dados). Plano de limpeza, sem mudar o visual no primeiro passo:
1. Quebrar em componentes: Hero (slider), FaixaMarquee, Manifesto, ListaEmpreendimentos, Lazer, Localizacao, NovaHarmonia, Contato, Rodape, FichaModal.
2. `HARMONIS` (objeto no `<script>`) vira `src/dados/empreendimentos.ts`, fonte única da vitrine e das LPs.
3. CSS com `#hm` escopado vira Tailwind + tokens (o escopo deixa de ser necessário fora do Elementor).
4. Pontos a corrigir ao migrar: `100vw` no wrapper (estoura com scrollbar), `lang`/`base target=_blank` do `<head>` (afetaria todos os links), formulário que mostra sucesso sem enviar nada (hoje só `form.reset()`), `[STATUS]`/`[CIDADE]` na tela (viram `[PREENCHER]` rastreado em PENDENCIAS), alt vazio nos slides do hero.
5. Menu da vitrine passa a ser o padrão do grupo. O HTML atual tem outro menu (Empreendimentos, Lazer, Onde estamos). Falta decidir como Perspectivas/Implantação se aplicam na vitrine (ver pergunta 3).

### Componentes externos (21st.dev e similares)
Entram via `npx shadcn add <url-do-registry>`, ficam no repo e são adaptados ao tema. Regra anti-template: cada componente puxado precisa ser refeito em tipografia, espaçamento, raio e cor do empreendimento antes de entrar. Antes das direções visuais, pesquisar 3 a 5 sites de loteamento/condomínio de alto padrão e extrair princípios (proporção, ritmo, onde ficam os CTAs).

## 4. Direções para a vitrine (escolher antes de codar)

- **A. Editorial** (a atual refinada): hero em slider, lista de empreendimentos em linhas largas, muito respiro. Prós: já aprovado e pronto. Contras: parecido com muitos sites imobiliários.
- **B. Mapa-primeiro**: mapa do RS/Brasil como protagonista, empreendimento escolhido por cidade, cards entram ao selecionar. Prós: reforça "localização é o produto" (estratégia de mídia). Contras: precisa de dados geográficos de todos.
- **C. Cartas por empreendimento**: grade de cartões grandes, cada um com a identidade (cor/logo) própria do Harmoni. Prós: mostra que cada um tem marca própria. Contras: pode virar colcha de retalhos de paletas.

Recomendação: A como base (menor risco, já existe) com um mapa da B dentro da seção "Localização". Confirmar com você.

## 5. Plano por etapas

1. **Scaffold** do repo (Next + Tailwind v4 + shadcn + GSAP), `dados` e tema de exemplo. Sem visual novo.
2. **Vitrine** migrada do HTML, comportamento idêntico, componentes limpos, dados separados.
3. **Verificação** da vitrine (1920/1440/768/390/320, teclado, console, lint, build).
4. **LP Vinhedos** (`/vinhedos` ou raiz, ver pergunta 2): análise do layout atual do WordPress, depois recriação.
5. **Template de LP** extraído da Vinhedos + Jardins (que já tem 10 blocos aprovados).
6. **Derivar as demais LPs**, de 3 em 3, cada uma com `dados.ts` + variações de seção.
7. Form → endpoint → CRM/RD (depende de acessos, ver pendências).

## 6. Pendências que travam (só o cliente/Thales responde)

- Hortênsias: cidade, status, logo SVG. Essenza: cidade real (Cachoeirinha ou Canoas).
- Reserva do Parque: Gravataí/RS ou Rio Verde/GO.
- Todos: status, nº de lotes, metragens, preço "a partir de", telefone/WhatsApp oficial, e-mail, endereço do stand, texto legal (matrícula, cartório, prefeitura) por empreendimento.
- Renders oficiais de Árbore, Vale, Essenza, Hortênsias, Jardins (hoje só há do Vinhedos).
- Qual CRM (Dashboard cita CV CRM) e acesso para o POST do lead; conta RD Station; IDs de GTM e Meta Pixel; política de privacidade (link hoje é `#`).
- Descrição curta de cada Harmoni para a ficha da vitrine (hoje `[DESCRIÇÃO CURTA...]`).
- Texto de copy do Jardins que sobrou nas copys de Vale/Árbore/Reserva do Parque e erro de digitação "larr" na copy do Vale (a copy diz "escolha agora onde será seu larr"; corrigir para "lar" e confirmar com a Pâmela/Clarissa).

## 7. Perguntas abertas

1. Quais são as 14 LPs? (Chute: Vinhedos, Jardins, Árbore, Vale, Essenza, Hortênsias, Parque Harmonia Canoas, Reserva do Parque, Parque Harmonia Viamão + 5 dos outros.)
2. A raiz `condominioharmoni.com.br/` hoje é a LP do Vinhedos e provavelmente recebe tráfego pago. Na nova estrutura a raiz vira a vitrine e o Vinhedos vai pra `/vinhedos`? Se sim, os anúncios precisam apontar para a nova URL (ou fazer redirect).
3. Na vitrine, "Perspectivas" e "Implantação" fazem sentido só dentro de cada LP. Quer o mesmo menu na vitrine (apontando para galeria geral e para a seção de empreendimentos) ou menu próprio da vitrine?
4. O Jardins já tem projeto em `harmoni-jardins` e domínio `harmonijardins.grifo.agency`. Ele migra para `/jardins` aqui ou continua separado?

## 8. O que NÃO consegui verificar

- Os dois sites foram lidos depois, pelo navegador do app (as ferramentas de busca falharam). O conteúdo está em `docs/CONTEUDO-FONTE.md`. Não olhei as subpáginas (Revista, páginas de cada empreendimento) nem o texto de Visão e Valores do site institucional.
- PDFs de manual do Árbore e do Essenza não deram texto (provável vetor/imagem): paletas e fontes deles precisam ser conferidas visualmente.
- O PPTX do manual do Jardins não tem texto extraível, só imagens.
- Livros (BOOK) de Árbore, Essenza e Jardins não foram lidos.
