# Estrutura de Pastas e Motivação para Tecnologias

## Estrutura de Pastas

O projeto segue uma estrutura de pastas organizada de acordo com os princípios da Clean Architecture e Clean Code, facilitando a manutenção, escalabilidade e testabilidade do código. A estrutura de pastas é a seguinte:
```bash
src/
├── application/
│ ├── interfaces/
│ ├── services/
│ └── use_cases/
├── domain/
│ └── entities/
├── infrastructure/
│ ├── database/
│ │ └── migrations/
│ └── websocket/
├── main/
├── presentation/
│ ├── controllers/
│ ├── middlewares/
│ ├── routes/
│ └── services/
tests/
```


## Detalhamento das Pastas

### application/
- **interfaces/**: Define interfaces para repositórios e outros serviços que serão implementados na camada de infraestrutura.
- **services/**: Contém a lógica de negócios, como serviços de autenticação, criptografia e manipulação de mensagens. Aqui, sigo o princípio da Single Responsibility, garantindo que cada serviço tenha uma única responsabilidade.
- **use_cases/**: Implementa casos de uso específicos da aplicação, seguindo o princípio da Dependency Inversion ao depender de abstrações (interfaces) em vez de implementações concretas.

### domain/
- **entities/**: Contém as entidades do domínio, representando os objetos de negócio principais, como `User` e `Message`.

### infrastructure/
- **database/**: Implementa a camada de acesso a dados. Inclui repositórios que implementam as interfaces definidas na camada de aplicação e a lógica de mapeamento de entidades.
- **migrations/**: Scripts para criar e atualizar o esquema do banco de dados.
- **websocket/**: Configuração e inicialização do servidor WebSocket.

### main/
- Contém a inicialização e configuração principal da aplicação, incluindo a configuração do servidor Express e do WebSocket.

### presentation/
- **controllers/**: Implementa os controladores que lidam com as requisições HTTP, delegando a lógica de negócio para os serviços apropriados.
- **middlewares/**: Contém middlewares para autenticação, logging e tratamento de erros.
- **routes/**: Define as rotas da aplicação, separando-as em módulos específicos como `authRoutes` e `messageRoutes`.
- **services/**: Implementa serviços específicos da camada de apresentação, como o `LoggingService`.

### tests/
- Contém os testes automatizados da aplicação, organizados de acordo com os módulos que testam. Utiliza o Jest como framework de testes.

## Motivação para Tecnologias e Estrutura

### Express.js
Escolhi o Express.js pela sua simplicidade e flexibilidade na construção de aplicações web. Ele permite a criação rápida de rotas e middlewares, facilitando a separação de responsabilidades e a manutenção do código.

### Node.js
Node.js é uma escolha natural para o backend devido à sua alta performance e escalabilidade. Ele permite o uso do JavaScript em toda a stack, unificando a lógica do frontend e backend.

### SQLite
Utilizo SQLite como banco de dados pela sua simplicidade e facilidade de configuração. É ideal para projetos pequenos a médios e facilita a migração para outros bancos de dados relacionais se necessário.

### WebSocket
WebSocket é utilizado para comunicação em tempo real, essencial para a aplicação de chat. Ele permite conexões bidirecionais eficientes, garantindo atualizações instantâneas entre clientes.

### Arquitetura em Camadas
Adoto uma arquitetura em camadas seguindo os princípios da Clean Architecture. Isso garante que a lógica de negócios esteja separada da infraestrutura e da apresentação, facilitando a testabilidade e manutenção do código.

### SOLID Principles
Aplico os princípios SOLID para garantir que o código seja modular, reutilizável e fácil de entender. Isso inclui a separação de responsabilidades, injeção de dependências e o uso de interfaces para definir contratos claros entre as camadas.

### Testabilidade
A estrutura do projeto facilita a criação de testes automatizados. Cada camada pode ser testada isoladamente, e a injeção de dependências permite a criação de mocks para testes unitários.

## Conclusão

A estrutura de pastas e a escolha das tecnologias visam criar uma aplicação escalável, manutenível e testável. Sigo os princípios da Clean Architecture e Clean Code para garantir que cada parte do sistema tenha uma responsabilidade clara e seja facilmente extensível. Isso não só melhora a qualidade do código, mas também facilita o trabalho em equipe e a evolução do projeto.

**Esse projeto foi desenvolvido para ser usado em conjunto com**
*[chat-frontend](https://github.com/gregoryderner/chat-frontend.git)*