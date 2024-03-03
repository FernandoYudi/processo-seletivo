# Projeto - Desenvolvimento de Agenda de Contatos

## Como configurar o projeto
Instalar o [MySQL Server](https://dev.mysql.com/downloads/mysql/) na porta 3306 e senha fer123.
Instalar o [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) e criar uma nova conexão com os parâmetros:
1. Nome: Local
2. Connection Method: TCP/IP
3. Hostname:localhost Port:3306
4. Username:root
5. Password/StoreinVault: fer123
Estabelecer uma nova Conexão 
6. create database customer_management_system;

Instalar o [Node 16.20.2](https://nodejs.org/en/blog/release/v16.20.2).
Instalar o [Apache Maven 3.9.6](https://maven.apache.org/download.cgi).

## Comandos para configuração do projeto

- mvn clean install
- npm install em front-end
- Rodar a AgendaApplication.java
- npm run start

## Tecnologias Utilizadas
- Node 16.20.2
- MySQL Server 8.3.0
- Angular 12.2.17
- JavaSpringBoot 3.1.9
- HTML5
- Bootstrap 5
- SCSS
- TypeScript 4.3.5

## Ambiente de Desenvolvimento

Para o ambiente de desenvolvimento, foi feita utilização do Visual Studio Code (VSCode) com as seguintes extensões instaladas:

Spring Boot Java
Maven for Java
Test Runner for Java
Entre outras extensões relacionadas ao desenvolvimento Java e Angular.

## Desafios e Limitações

Durante o desenvolvimento, diversos desafios técnicos foram enfrentados ao explorar a integração entre Angular, Spring Boot e MySQL, além da dificuldade de implementar uma nova tecnologia como o NGXS para gerenciamento de estado no Angular.

Durante o desenvolvimento, é destaque a curva de aprendizado e os desafios técnicos associados à implementação do NGXS. Embora o NGXS ofereça uma solução eficiente para gerenciamento de estado no Angular, sua integração e configuração adequadas exigiram tempo e esforço significativos. Por fim, fora decidido não incluir o NGXS no projeto devido às restrições de tempo e a necessidade de priorizar a entrega de funcionalidades essenciais dentro do cronograma estabelecido. Em vez disso, foi optado por desenvolver os handlers de estado diretamente com o Angular, aproveitando as funcionalidades internas do framework para lidar com o estado da aplicação.

## Agradecimentos e Considerações Finais

Gostaria de expressar minha gratidão pela oportunidade de realizar o teste técnico. Entendo que o resultado final não atingiu todas as expectativas. Vale ressaltar que o prazo limitado para trabalhar no projeto foi influenciado pelo meu compromisso acadêmico e profissional. Agradeço pela compreensão e pela oportunidade de aprendizado proporcionada por este projeto.

