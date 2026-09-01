# Política de Privacidade — Adicionar Lero-lero

Última atualização: 1º de setembro de 2026.

A extensão **Adicionar Lero-lero** foi criada para permitir que o usuário preencha, sob demanda, campos editáveis de formulários com textos e dados fictícios para testes.

## Dados tratados pela extensão

A extensão pode acessar localmente o conteúdo do campo de formulário com o qual o usuário está interagindo, exclusivamente para executar a ação de preenchimento solicitada pelo próprio usuário.

Ela também armazena localmente, por meio do armazenamento do navegador, a preferência do usuário sobre o tipo de texto fictício selecionado.

## Coleta, transmissão e compartilhamento

A extensão não envia o conteúdo dos formulários para servidores do desenvolvedor ou de terceiros.

A extensão não vende, compartilha ou transfere dados do usuário para terceiros.

A extensão não utiliza dados para publicidade, análise de comportamento, avaliação de crédito, empréstimos ou qualquer finalidade não relacionada ao seu único propósito.

## Armazenamento local

As preferências da extensão são armazenadas localmente no navegador por meio da API `chrome.storage.local`.

Essas preferências permanecem no dispositivo do usuário e não são sincronizadas com servidores do desenvolvedor.

## Permissões

A extensão utiliza as permissões necessárias para sua funcionalidade:

- **contextMenus**: adiciona a opção "Adicionar Lero-lero..." ao menu de contexto de campos editáveis;
- **storage**: armazena localmente a preferência do tipo de texto selecionado;
- **acesso a páginas da Web**: permite que a extensão funcione em campos de formulário nas páginas acessadas pelo usuário e insira o conteúdo solicitado.

## Código remoto

A extensão não baixa nem executa código JavaScript remoto. Os arquivos necessários para seu funcionamento fazem parte do próprio pacote da extensão.

## Alterações nesta política

Esta política poderá ser atualizada caso o comportamento da extensão ou suas permissões sejam alterados. A versão mais recente permanecerá disponível neste repositório.

## Contato

Dúvidas sobre esta política ou sobre a extensão podem ser enviadas por meio do repositório público do projeto no GitHub:

https://github.com/hewerthomn/lero-lero
