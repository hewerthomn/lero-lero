# Lero Lero - Form Filler

Extensão para Google Chrome voltada ao preenchimento rápido de campos de formulário com textos e dados de teste.

A versão 2 usa **Manifest V3** e está sendo evoluída para um form filler completo, com detecção inteligente de campos, geradores locais, templates e profiles por página/site.

## Estado atual da v2

- Manifest V3;
- background executado como service worker;
- código organizado em camadas independentes;
- `FormScanner`, `FieldDetector` e `FieldFiller` separados;
- generators registrados por `GeneratorRegistry`;
- storage encapsulado por repositories;
- contratos iniciais para profiles e templates;
- menu de contexto para campos editáveis;
- preenchimento de e-mail, URL, número e texto;
- sem dependência de jQuery;
- sem APIs legadas do Manifest V2.

Os geradores de texto históricos continuam temporariamente encapsulados pelo novo registry. Eles serão removidos quando entrar o novo gerador local Lero Lero.

## Estrutura

```text
src/
├── background/
├── content/
├── generators/
├── popup/
├── profiles/
├── shared/
├── storage/
└── templates/
```

A arquitetura e os contratos estão descritos em [`docs/architecture.md`](docs/architecture.md).

## Instalação para desenvolvimento

1. Clone este repositório.
2. Abra `chrome://extensions` no Chrome.
3. Ative **Developer mode**.
4. Clique em **Load unpacked**.
5. Selecione a pasta do projeto.

Para testar, abra `tests/index.html` em um servidor HTTP local ou qualquer página com campos de formulário, clique com o botão direito em um campo editável e escolha **Adicionar Lero-lero...**.

## Próximas etapas da v2

O próximo milestone é o **Smart Fill**: ampliar o scanner e o detector para todos os principais controles HTML, inferência semântica por `name`, `id`, `label`, `placeholder`, `autocomplete` e demais atributos.

## Origem

O projeto original foi inspirado na extensão Paste 'Lorem Ipsum...' e no Gerador de Lero-Lero.
