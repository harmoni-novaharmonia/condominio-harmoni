# Pendências

## Decisões do Thales

- Quais são as 14 LPs.
- Vitrine na raiz (`/`) e Vinhedos em `/vinhedos`: confirmado como plano, falta data.
- Menu da vitrine: manter o do HTML (Empreendimentos, Lazer, Onde estamos, Falar com consultor) ou usar o padrão das LPs.
- Linha de status + cidade no hero: manter ou cortar ("menos é mais").
- Jardins migra para `/jardins` neste repositório?

## Conteúdo

- Textos `[STATUS]`, `[CIDADE, UF]`, `[DESCRIÇÃO CURTA...]` e `[TELEFONE OFICIAL]` seguem como placeholder visível.
- Hortênsias, Reserva das Flores, Jardim dos Ipês 2 e 3 e Flor do Cerrado sem material.
- Jardins, Árbore, Vale e Essenza sem perspectivas, implantação e mapa.
- Conferir "Villa" vs "Vila" Imperial e as divergências de cidade (Essenza, Reserva do Parque). Detalhes em `docs/EMPREENDIMENTOS.md`.

## Técnico

- Salvar o HTML da vitrine em `referencia/vitrine-original.html` (fonte de verdade da fase 1).
- Endpoint de lead (CRM + RD Station) ainda não existe. O formulário não pode mostrar sucesso sem entrega.
- Otimizar imagens (AVIF/WebP) antes do deploy; ver `docs/IMAGENS.md`.
- Hostinger Cloud Enterprise: confirmar como será servida a pasta `out/` e os redirecionamentos.

## Vitrine migrada (2026-10-05)

- SEO: o hero tem 5 `<h1>` (um por slide), como no original. Definir qual vira o único h1 da página.
- Título da página vem do original; falta meta description (texto a aprovar) e imagem Open Graph.
- Rolagem com a roda: o site no WordPress usa um plugin de rolagem suave. No Next não foi portado; decidir se mantém.
- GTM do site atual (`GTM-K6S528DS`) e pixels ainda não foram colocados no projeto.
- Formulário: mostra "Recebemos seu contato" sem enviar nada. Ligar ao endpoint antes de publicar.
- Link "Site do empreendimento" da ficha e "Política de Privacidade" apontam para `#`.
- Hero e ficha repetem renders do Vinhedos nos outros Harmonis (provisório).

## Header e rodapé (2026-10-05)

- URLs das redes no rodapé (Facebook, Instagram, LinkedIn, WhatsApp). Hoje apontam para `#`.
- Telefone, WhatsApp, e-mail, endereço do stand e texto legal por empreendimento: o rodapé novo não mostra esses campos. Entram quando o cliente enviar.
- Os itens do menu "Empreendimentos" abrem a ficha. Quando as LPs existirem, viram links para `/<slug>`.
- Fotos de Árbore, Vale, Essenza e Hortênsias no menu são renders do Vinhedos (provisórios).
- Decidir se o Jost vale também para os títulos das seções (hoje só header e rodapé).

## LPs dos empreendimentos (2026-10-05)

### Bloqueia publicação
- Endpoint do lead (CRM + RD Station). Hoje o formulário de todas as LPs cai no aviso com WhatsApp.
- Registro jurídico de Jardins, Arbore, Vale e Essenza (matrícula, cartório, prefeitura). Hoje aparece `[PREENCHER]` no rodapé. O do Vinhedos é o oficial.
- Telefone e WhatsApp oficiais por empreendimento. Todas usam os números do Vinhedos ((51) 99719-6426 e (51) 9901-8575), os mesmos das LPs no ar.
- Política de Privacidade (link `#`) e URLs das redes sociais (`#`).

### Conteúdo
- Renders, implantação e mapa próprios de Jardins, Arbore, Vale e Essenza. Hoje são do Vinhedos, com o selo "Imagem provisória".
- Legenda da implantação dessas quatro: veio do modelo no ar (6 itens) e não bate com a planta provisória.
- Lista "item por item" (14 itens) das quatro: é a do modelo Jardins. Confirmar por empreendimento.
- Faixa "lotes a partir de 160m²" no Arbore e chamada "160m²" no Essenza: texto do modelo, confirmar a metragem de cada um.
- Localização do Vale: texto `[PREENCHER]`. Endereço e pontos de interesse de Jardins, Arbore e Vale: `[PREENCHER]`.
- Hortênsias: sem LP (não há logo, cidade nem copy).

### Copy do cliente sinalizada
- Vale: "Escolha agora onde será seu larr". Corrigido para "lar" na tela; confirmar com o cliente.
- Vinhedos/Arbore: "Infraestrutura a altura do padrão..." está sem crase ("à altura"). Mantido como veio.
- Vinhedos: "Saúde para viver mais longe!" mantido como veio (talvez "viver mais").
- Essenza: o docx tem "CONEСТА" com letras cirílicas; usado "conecta".
- Arbore: o paragrafo da araucária tem travessão. Mantido como veio.
- Nome: logo e copy escrevem "Arbore"; a vitrine escreve "Árbore". Definir a grafia oficial.
- Hero do Vinhedos: a LP no ar digita "VIVA COM E... EM HARMONIA". Aqui as quatro palavras do conceito (segurança, exclusividade, comodidade, lazer) se alternam. Confirmar a intenção.

### Técnico
- Vitrine: o botão "site" da ficha já leva à LP. Os itens do menu "Empreendimentos" ainda abrem a ficha; decidir se viram link direto.
- Mapas das LPs são ilustrados, fora de escala. Trocar ou complementar com o Google Maps quando cada endereço for confirmado.
- Vinhedos: endereço do stand "Av. Senador Salgado Filho, 7700, Viamão/RS" veio da LP no ar. Confirmar.
- Pontos dos mapas (Aeroporto Salgado Filho, Av. Flores da Cunha, Freeway BR-290, RS-118, ULBRA, Park Shopping Canoas) vieram da copy de cada LP. Confirmar distâncias e ordem da rota do Essenza.
- Endereço do empreendimento: `[PREENCHER]` em Jardins, Arbore, Vale e Essenza.

## Vitrine refeita (2026-10-06)

### Confirmar com o cliente
- Hero: "Uma linha de condomínios **horizontais** pensada para morar bem." A palavra "horizontais" foi acrescentada à frase da vitrine original por SEO.
- Status do Vinhedos como "Lançamento" (vem do título da LP no ar) e do Jardins como "Lançamento em breve" (vitrine original). Árbore, Vale e Essenza: `[STATUS]`.
- Lotes "a partir de" de Jardins, Árbore, Vale e Essenza: `[PREENCHER]`.
- Números de lotes de "Quem constrói" (1.369, 1.895, 1.181 e 341) foram lidos em novaharmonia.com.br em 04/10/2026. Confirmar se seguem atuais.
- Galeria de obras: empreendimento da foto da ciclovia e local do stand da foto do prédio.
- Licença das fotos de banco (família panorâmica e família no jardim), que vieram do material do Jardins.
- Hortênsias: cidade, logo e fotos (aparece só no bloco "Em breve").
- Jardins e Essenza têm o mesmo título no hero das LPs; na vitrine o Essenza usa a frase curta da vitrine original.

### Técnico
- A vitrine não tem WhatsApp, telefone, e-mail nem stand próprios (`[WHATSAPP OFICIAL]`, `[ENDEREÇO]` na tela). Sem Harmoni escolhido, o formulário oferece o WhatsApp do Vinhedos.
- Endpoint do lead da vitrine: `contato.endpoint` em `src/dados/vitrine.ts`, vazio.
- Redirecionamento 301 da raiz atual (LP do Vinhedos no WordPress) para `/vinhedos/` e atualização dos anúncios antes de publicar.
- `nova-harmonia/institucional/quem-somos.webp` (2,4 MB) e `background-home.webp` (1,6 MB) não são usados por nenhuma página. Ficaram por serem do cliente; apagar se não forem voltar.
