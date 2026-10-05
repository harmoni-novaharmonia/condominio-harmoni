# Changelog

## 2026-10-04

- Estrutura inicial do projeto: README, `docs/`, `.gitignore`.
- Plano de arquitetura e conteúdo-fonte lidos do site oficial.
- Imagens do material do cliente organizadas em `public/img/<slug>/...` (só Harmoni, logos Nova Harmonia e ícones).
- Inventário em `docs/IMAGENS.md` e lista dos empreendimentos em `docs/EMPREENDIMENTOS.md`.

## 2026-10-05

- Scaffold do projeto: Next 16 (App Router) + TypeScript + Tailwind v4 (sem preflight) com `output: 'export'`.
- Vitrine migrada do HTML original (`referencia/vitrine-original.html`, copiado do WordPress) para componentes em `src/secoes/vitrine/`, hooks em `src/hooks/` e CSS em `src/estilos/vitrine.css`.
- Dados separados dos componentes: `src/dados/empreendimentos.ts` (lista única dos Harmonis) e `src/dados/vitrine.ts` (textos e imagens da vitrine).
- Imagens do WordPress agora locais em `public/img/`. Adicionados `gourmet-13.webp` e `gourmet-14.webp` (originais do site) e `nova-harmonia/logo-vertical.svg` (logo do rodapé).
- Correções sem mudar o visual: removidos `100vw` do wrapper e `<base target="_blank">`; `width`/`height` em todas as imagens; ficha com estado próprio (pausa do slider, trava de rolagem e foco devolvido ao fechar).
- `line-height:1` nos campos do formulário: reproduz o reset de `label` do tema do WordPress, que definia a altura dos campos no site publicado.
- Limpeza: removidos `.gitkeep` de pastas que já têm arquivos e 3 imagens duplicadas (`gourmet.webp`, `nova-harmonia/logo.png` e `logo-2.png`). Os originais continuam na pasta Nova Harmonia.

## 2026-10-05 (header e rodapé)

- Header refeito: barra flutuante, vidro escuro no topo e creme sólido ao rolar (logo troca de creme para petróleo). Menu "Empreendimentos" com card do lançamento e lista com miniaturas; no celular o cartão continua a barra, cabe sem rolagem e esconde a barra de rolagem em telas muito baixas.
- Rodapé refeito em quatro colunas iguais, com filete no topo e na base, redes e "Voltar ao topo".
- Animações: entrada do header, cruzamento dos logos, menu em sequência, botão do menu mobile que vira X, filete e colunas do rodapé entrando ao rolar, brilho que flutua. Só transform/opacity, respeitam `prefers-reduced-motion`.
- Fonte Jost nos títulos do header e do rodapé (Lato segue no texto).
- Âncoras agora param 88px abaixo do topo (altura da barra).
- Removido o CSS antigo do header e do rodapé; novo CSS em `src/estilos/header.css` e `src/estilos/rodape.css`.
- Metadados embutidos removidos dos SVGs `harmoni-logo-creme`, `-petroleo` e `-editavel`; o desenho não muda.

## 2026-10-05 (LPs dos empreendimentos)

- Rota `/[slug]` com export estático: `/vinhedos`, `/jardins`, `/arbore`, `/vale`, `/essenza`.
- Contrato de dados em `src/empreendimentos/tipos.ts`. Cada LP declara no seu `dados.ts` as seções, a ordem e a variante de cada uma. Conteúdo da Nova Harmonia comum a todas (menu, formulário, grupo SFA, memorial) em `src/empreendimentos/comum.ts`; renders em `src/empreendimentos/renders.ts`.
- Seções em `src/secoes/lp/` com variantes: Hero (rotativo, dividido, editorial, moldura, essência), Conceito (pilares, colagem, manifesto), Perspectivas (acordeão, trilho, mosaico, palco, galeria), Diferenciais (grade numerada, lista, marquee, grupos), Implantação (lateral, abaixo), Grupo (editorial, escuro, missão), Localização (mapa, Google Maps), Chamada, Obra, Contato.
- Header no padrão do header-2: barra transparente no topo que vira pílula de vidro ao rolar; no celular, menu de tela cheia com trava de rolagem, Esc fecha.
- Rodapé no padrão do footer-section: quatro colunas (chamada para o consultor, navegação, telefones, redes com dica) e barra de base. Sem newsletter e sem modo escuro. Memorial jurídico completo fecha a página.
- Formulário de lead: só mostra sucesso com resposta 2xx do endpoint. Sem endpoint, avisa e oferece o WhatsApp com mensagem pronta.
- Header e rodapé portados sem as dependências do shadcn (Radix, cva, lucide): o comportamento é o mesmo e o projeto não ganhou pacotes.
- Paleta única da linha Harmoni (logos + manual do Jardins); cada tema só redistribui fundo, escuro e acento. Poppins nos títulos das LPs.
- Logos dos Harmonis com o respiro recortado (`logo-0N-recorte.svg`) para caber no header.
- `allowedDevOrigins` no `next.config.ts` para abrir o `next dev` por 127.0.0.1.
- `metadataBase` no layout: imagens de compartilhamento com URL absoluta em `condominioharmoni.com.br`.

## 2026-10-05 (LPs refeitas no layout aprovado)

- As cinco LPs refeitas seção por seção a partir do layout aprovado. Cada uma tem hero, carrossel, mapa e animação próprios; header, rodapé e formulário são iguais em todas.
- Fonte única: Jost Light nos títulos e no texto, peso 500 só no destaque. Poppins saiu do projeto.
- Ícones de linha em `public/img/icones/lp/` (42), com nome tipado em `src/empreendimentos/icones.ts`. Todos reagem ao hover com a cor de acento de cada tema.
- Hero: cinema (Vinhedos, palavras alternando), dividido (Jardins, foto abaixo do header), editorial com cartão (Arbore), foto de fundo (Vale) e painel (Essenza).
- Carrosséis: cinema com miniaturas (Vinhedos), leque (Jardins), pilha (Arbore), centro (Vale) e índice (Essenza). Funcionam no toque.
- Mapas ilustrados com endereço e pontos próximos: foto com zoom (Vinhedos), ilustrado (Jardins), radar (Arbore), abas por grupo (Vale) e rota (Essenza, vira lista vertical no celular).
- Formulário único: nome em linha cheia, telefone e e-mail lado a lado, aceite e botão em largura total.
- Raio de borda reduzido (4 a 8px) em cartões, campos e botões.
- Novas seções: Destaques (Vinhedos) e Missão (Vale). Removidos `Ampliavel`, `Icone`, `Revelar` e `Faixa`.
- Classes de variante das seções viraram `obra-v-*` e `imp-v-*` para não colidir com os blocos internos.
- Fichas da vitrine agora levam para `/jardins/`, `/arbore/`, `/vale/` e `/essenza/`.
- Favicon com o símbolo da Nova Harmonia (`src/app/icon.svg`).

## 2026-10-05 (Vinhedos igual à LP no ar)

- `/vinhedos` agora reproduz a LP do WordPress (condominioharmoni.com.br) seção por seção: mesmos textos, fotos, ícones, cores, fontes (Lato, Roboto nos botões, Poppins no título do stand) e ordem. Só o header e o rodapé são os do projeto.
- Nova seção `no-ar` no contrato (`tipos.ts`): página inteira própria entre header e rodapé. Componentes em `src/empreendimentos/vinhedos/secoes/` (`PaginaNoAr`, `CarrosselNoAr`), tipos em `vinhedos/tipos.ts`, CSS em `src/estilos/vinhedos-no-ar.css`.
- Carrossel com o comportamento do Elementor: 1 slide (2 no tablet), autoplay de 5 s, pausa no hover, para quando a pessoa mexe, setas e bolinhas.
- `FormLead` aceita `placeholders` (a página do Vinhedos usa os da LP no ar). O envio continua sem mostrar sucesso sem endpoint.
- Imagens novas, baixadas da LP no ar: `vinhedos/hero/fundo.webp`, `vinhedos/conceito/familia-desktop.webp` e `familia-celular.webp`, `vinhedos/chamada/experiencia.webp`, `vinhedos/perspectivas/lava-jato-interno.webp`, `vinhedos/logo-nova-harmonia.png` e os 20 ícones em `vinhedos/icones/`.
- A seção `Destaques` e as variantes que só o Vinhedos usava (hero cinema, carrossel cinema, diferenciais em abas, mapa com zoom) ficaram sem uso.
