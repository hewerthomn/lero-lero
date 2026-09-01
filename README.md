# Lero Lero - Form Filler

Extensão para Google Chrome voltada ao preenchimento rápido de campos de formulário com textos e dados de teste.

A versão 2 inicia a modernização do projeto para **Manifest V3** e prepara a base para evoluir o Lero Lero para um form filler completo.

## Estado atual da v2

- Manifest V3;
- background executado como service worker;
- menu de contexto para campos editáveis;
- preenchimento de e-mail, URL, número e texto;
- armazenamento local do tipo de texto;
- sem dependência de jQuery;
- sem APIs legadas do Manifest V2.

Nesta primeira etapa da v2, os geradores de texto existentes foram preservados para manter compatibilidade funcional. Eles serão reorganizados nas próximas etapas do Form Filler.

## Instalação para desenvolvimento

1. Clone este repositório.
2. Abra `chrome://extensions` no Chrome.
3. Ative **Developer mode**.
4. Clique em **Load unpacked**.
5. Selecione a pasta do projeto.

Para testar, abra `tests/index.html` em um servidor HTTP local ou qualquer página com campos de formulário, clique com o botão direito em um campo editável e escolha **Adicionar Lero-lero...**.

## Próximas etapas da v2

A evolução planejada inclui Smart Fill, detecção semântica de campos, geradores locais, templates dinâmicos e profiles configuráveis por site/página.

## Origem

O projeto original foi inspirado na extensão Paste 'Lorem Ipsum...' e no Gerador de Lero-Lero.
