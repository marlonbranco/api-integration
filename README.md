# Projeto API RESTful para integração entre Pipedrive e Bling

## Desenvolvida em utilizando as tecnologias TypeScript, NodeJS, Express, Mongoose, Axios, Node-schedule 🛠

[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Node.JS](https://img.shields.io/badge/-Node.JS-339933?logo=node.js&logoColor=white)](https://nodejs.org/en/) [![Mongo](https://img.shields.io/badge/-Mongo-47A248?logo=mongodb&logoColor=white)](https://docs.mongodb.com/) [![Mongoose](https://img.shields.io/badge/-Mongoose-880000?Color=white)](https://mongoosejs.com/docs/)

Uma API RESTful que tem a função de integrar o CRM da Pipedrive com o ERP da Bling, durante a integração a API migra os 'Deals' com "status=won" e gera novos Pedidos no Bling, tudo isso é feito utilizando as tecnologias JavaScript, TypeScript, NodeJS, Babel, Express, Mongoose, Axios, Node-schedule 🛠

O projeto foi desenvolvido utilizando a arquitetura ou `design pattern` padrão DDD, aplicando os conceitos de CleanArchture, CleanCode e SOLID.

#### Requerimentos ✅

| Requerimento  | Uso |
| ------------- | -------------- |
| Docker 3.x    | Containerização |
| Node 12.x     | Executar a aplicação de forma local |
| Postman ^4.4.3 | Realizar requests à API |

## Entendendo a estrutura de pastas 🗂

```
    ├── .github
    ├── src            # Arquivos de Recursos da aplicação
    │   ├── @types     # Configurações de tipos para o TypeScript
    │   ├── modules    # Módulos da aplicação onde se encontrão os domínios
    │   └── shared     # Pasta com os recursos compartilhados entre os domínios
    └── ...
```

### Pasta de Modules 📁

```
├── ...
├── modules          # Módulos da aplicação
│   ├── dailyResume  # Módulo de resumos diários/ entidade dailyResumes
│   ├── integration  # Módulo de integração/ lógica de negócio da integração completa
└── ...
```

### Dentro de um módulo 📁

```
    ├── ...
    ├── dailyResume       # Módulo de resumos diários/ entidade dailyResumes
    │   ├── dtos          # Pasta onde ficam os Data Transfer Objects
    │   ├── infra         # Infra específico do módulo
    │   ├── repositories  # Repositórios dos resumos diários
    │   ├── useCases      # UseCases com as regras de negócio do domínio e testes unitários
    │   └── utils         # Utils específico do módulo
    └── ...
```

### Dentro da pasta infra de um módulo 📁

```
        ├── ...
        ├── infra                 # Infra específico do módulo
        │   ├── http              # Recursos HTTP do domínio
        │   │   ├── controllers   # Controllers das requisições das rotas
        │   │   └── routes        # Rotas de dailyResumes
        │   └─── mongoose         # Recursos isolados do Mongoose
        │       ├── entities      # Schemas/entidades do domínio específicas do Mongoose
        │       └── repositories  # Repositórios isolados com os métodos do Mongoose
        └── ...
```

### Dentro da pasta shared 📁

```
  ├── ...
  ├── shared                  # Shared recursos compartilhados entre os domínios
  │   ├── containers          # Container com as injeções de dependências dos repositórios
  │   │   └── providers       # Providers compartilhados entre os módulos
  │   ├── errors              # Configuração de mensagens de erros retornadas
  │   └── infra               # Infra da aplicação como um todo
  │       ├── http            # Configurações HTTP da aplicação routes/server
  │       │   ├── app         # Instância da aplicação
  │       │   └── routes      # Instância de rotas de cada módulo da aplicação
  │       └── mongoose        # Configuração do Mongoose para conexão com o MongoDB
  └── ...
```

## Estrutura do Banco 🗃

![UML do BD](.github/media/UML.png)

## Depois de clonar o repositório 📦

Execute o seguinte comando no terminal para instalar todas as dependências:

```bash
npm install
```
ou
```bash
yarn
```

## Criação dos containers com Docker para execução da aplicação 🐳

Execute o seguinte comando no terminal para criar uma build da aplicação em uma imagem do Node.JS onde a API executará e criar junto um container, dentro desse container serão criados 2 containers um para o Node.JS o outro para o MongoDB:

```bash
docker-compose -f docker-compose.yml up -d
```

> Após a execução o container node-backend-mvc será gerada no seu Docker

## Verificando se a aplicação está executando corretamente 🐳

Agora abra a sua aplicação do `Docker` e clique no container `api-integration` ➡ `api-marlon`, e deverá ver os seguintes logs:

![Node container Logs](.github/media/docker-logs.png)

> Se tudo estiver executando perfeitamente os logs da imagem acima deverão ser exibidos.

