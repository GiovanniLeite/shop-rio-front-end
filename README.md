# Mercado shopRio
Site do mercado fictício shopRio, projeto criado para o estudo de React, constitui-se de uma API REST feita em Javascript, que tem como princípais pacotes node o Express e o Sequelize, e que conecta-se a um banco de dados MySQL, tem seu front-end feito também em Javascript com React, Redux, Redux Saga, Axios entre outros, tanto front-end quando back-end também utilizam os pacotes Eslint e Prettier para melhor escrita do código.  
É um site de e-commerce simples voltado a uma loja ou mercado que entregue os seus próprios produtos e sem a opção de operações de pagamento pelo site.

O site pode ser divido em duas áreas:

## Área Comum
Na area comum temos a página Home, onde fica o banner princípal do site com promoções ou anuncios diversos, e seções com 6 produtos de determinadas categorias, em cada seção temos um link que nos leva para a página Procurar, e cards dos produtos com foto, nome e valor, alem de um botão que permite que o item seja adicionado direto ao carrinho, clicando na imagem ou nome o usuário pode ir até a página Produto.

Procurar é a página onde podemos ver todos os produtos daquela categoria e um campo de buscas, nela também podemos encontrar cards de cada item, semelhantes aos encontrados na página Home.

Na página do Produto encontramos informações gerais como nome, valor, descrição, fotos e promoções, neste local temos os botões para adicionar o produto ao carrinho ou a lista de desejos.

Página Login/Registre-se, a esquerda temos um formulário com campos email e senha onde podemos fazer o login no site. A direita formulário com nome, cpf, email e senha onde podemos registrar uma nova conta e assim poder entrar.

Por fim, temos o Header dividido em três seções:

 A primeira contém na esquerda ícones com links para as redes sociais da loja, e na direita caso o usuário esteja com uma conta de cliente ou deslogado temos ícones com atalhos para notificações, perfil, carrinho, lista de desejos e o botão sair, caso o usuário esteja com uma conta de administrador temos os ícones para o perfil e para o botão sair.  
 Na segunda, a esquerda temos o botão com um menu, que contém um campo de buscas, um botão togle com link para todas as categorias de produtos e ícones que funcionam da mesma forma que os da primeira seção, no meio temos a logo do mercado com link para Home, e a direita temos mais um campo de buscas.  
 E na terceira, temos links para todas as categorias e seus produtos.

## Área do Administrador
Nesta area existem algumas páginas como a Perfil do Administrador, que possuí 5 abas:  

- Pendentes, lista todos os pedidos pendentes, contém os botões necessários para apenas gerar o relatório da compra, gerar o relatório e marcar como em rota, e marcar pedido como entregue.  
- Relatórios, local onde podemos gerar diversos tipos de relatórios com as opções, todos os pedidos, entregues, não entregues, por período e pedido específico.  
- Perfil, onde podemos editar as informações pessoais do usuário.  
- Adm, aba com links para as páginas de busca e edição de Categorias, Produtos e contas de usuário.  
- Segurança, aqui temos opções para alterar email, senha e exclusão da conta.

Na página de Busca do Administrador encontramos um campo de busca e a listagem do que foi procurado (Categoria, Produto ou Usuário Adm), temos também opção de criar um novo e excluir ou ir para página de edição de um registro existente.

Na página Editar/Novo podemos criar ou editar todas as informações referentes ao registro que selecionamos.


Observação: este projeto não contempla nenhuma operação de pagamento.
