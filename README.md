# Adicionar Lero-lero

Extensão open source para Google Chrome que adiciona textos de Lero-lero e dados simples de teste em campos de formulário pelo menu de contexto.

## Versão atual

A versão **1.1.0** mantém a proposta original da extensão e atualiza a base técnica para **Manifest V3**.

Principais mudanças desta atualização:

- Manifest V3;
- background executado como service worker;
- menu de contexto para campos editáveis;
- preenchimento de e-mail, URL, número e texto;
- armazenamento local do tipo de texto;
- remoção da dependência de jQuery;
- remoção das APIs legadas do Manifest V2.

Os geradores de texto existentes foram preservados para manter compatibilidade com o comportamento histórico da extensão.

## Instalação para desenvolvimento

1. Clone este repositório.
2. Abra `chrome://extensions` no Chrome.
3. Ative **Developer mode**.
4. Clique em **Load unpacked**.
5. Selecione a pasta do projeto.

Para testar, abra `tests/index.html` em um servidor HTTP local ou qualquer página com campos de formulário, clique com o botão direito em um campo editável e escolha **Adicionar Lero-lero...**.

## Sobre este repositório

Este repositório contém a extensão open source original e continuará focado na versão clássica compatível com Manifest V3.

Uma nova geração do projeto, voltada a preenchimento avançado de formulários, profiles, regras dinâmicas e outros recursos, será desenvolvida separadamente.

## Origem

O projeto original foi inspirado na extensão Paste 'Lorem Ipsum...' e no Gerador de Lero-Lero.
