# CollectionLinks

- Front-end: https://github.com/Gabriel-Malafaia/NodeJS-CollectionLinks-FrontEnd
- Back-end: https://github.com/Gabriel-Malafaia/NodeJS-CollectionLinks-BackEnd


A API "Collection Links" foi desenvolvida com o propósito de fornecer aos usuários a possibilidade de gerenciar seus links de blogs favoritos de maneira fácil e eficiente. Com as funcionalidades de CRUD, os usuários podem cadastrar, editar e excluir links, além de adicioná-los aos seus favoritos. Além disso, implementamos um sistema de scraping, que permite buscar automaticamente os 3 principais artigos relacionados a cada link adicionado como favorito, tornando a experiência dos usuários ainda mais completa e satisfatória.

Obs: Atualização: Atualmente, o nosso recurso de scraping (puppeteer) só está disponível localmente devido a uma limitação da plataforma de hospedagem gratuita que estamos usando (render.com)

# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
- [Endpoints](#5-endpoints)

---

## 1. Visão Geral

Tecnologias utilizadas no projeto:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Yup](https://www.npmjs.com/package/yup)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [ValidURL](https://www.npmjs.com/package/valid-url)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)

URL base da aplicação:
https://collectionlinks.onrender.com

---

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![DER](https://i.imgur.com/6KvGCl6.png)

---

## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [GET - /users](#12-listando-usuário)
- [Session](#2-session)
    - [POST - /session](#21-login-de-usuário)
- [Links](#3-links)
    - [POST - /links](#31-criação-de-links)
    - [POST - /links/link_id/favorite](#32-criação-de-link-favorito)
    - [GET - /links](#33-listando-links)
    - [PATCH - /links/:link_id](#34-editando-link-por-id)
    - [DELETE - /links/:link_id](#35-deletando-link-por-id)
    - [DELETE - /links/:link_id/unfavorite](#36-deletando-link-favorito)
---

## 1. **Users**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto User é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id         | string | Identificador único do usuário                  |
| name       | string | O nome do usuário.                              |
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |
| links      | array  | Links atrelados ao usuário                      |
| createdAt  | Date | Data de criação do usuário.           		        |	

### Endpoints

| Método   | Rota       | Descrição                               		           |
|----------|------------|--------------------------------------------------------|
| POST     | /users     | Criação de um usuário.                 		             |
| GET      | /users     | Lista um usuário autorizado.                		       |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
POST /users
Host: https://collectionlinks.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "name": "Seraphim",
  "email": "seraphim@gmail.com",
  "password": "231234a"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
  "id": "4e9b3cd0-1e10-4b07-bf47-2766fc552f9b",
  "name": "Seraphimdss",
  "email": "seraphims@gmdsail.com",
  "createdAt": "Wed Feb 15 2023 17:08:58 GMT+0000 (Coordinated Universal Time)"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 409 Conflict   | Email already registered.     |
| 400 Bad Request | Missing fields.             |

---

### 1.2. **Listando Usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/users`

### Exemplo de Request:
```
GET /users
Host: https://kenzielogapi.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
200 OK
```
```json
{
  "id": "4e9b3cd0-1e10-4b07-bf47-2766fc552f9b",
  "name": "Seraphim",
  "email": "seraphim@gmail.com",
  "createdAt": "Wed Feb 15 2023 17:08:58 GMT+0000 (Coordinated Universal Time)",
  "links": [
    {
      "id": "8f1fc7b6-754a-4062-ab66-c18a23da1fb6",
      "title": "Blog",
      "description": "Trybe blog",
      "url": "https://blog.betrybe.com/",
      "favorite": false,
      "createdAt": "2023-02-15T17:58:03.524Z",
      "updatedAt": "2023-02-15T17:58:03.524Z",
      "mainTopics": []
    }
  ]
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized   | Missing authorization.    |

---

## 2. **Session**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Session é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| email      | string | O e-mail do usuário.                            |
| password   | string | A senha de acesso do usuário                    |

### Endpoints

| Método   | Rota       | Descrição                               		 |
|----------|------------|--------------------------------------------------------|
| POST     | /session     | Login de um usuário.                 		   |

---

### 2.1. **login de usuário**

[ Voltar para os Endpoints ](#5-endpoints)

### `/session`

### Exemplo de Request:
```
POST /session
Host: https://collectionlinks.onrender.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "email": "seraphim@gmail.com",
  "password": "231234a"
}
```
### Exemplo de Response:
```
200 Ok
```
```json
{
  "user": {
    "id": "4e9b3cd0-1e10-4b07-bf47-2766fc552f9b",
    "name": "Seraphim",
    "email": "seraphim@gmail.com",
    "createdAt": "Wed Feb 15 2023 17:08:58 GMT+0000 (Coordinated Universal Time)",
    "links": [
      {
        "id": "8f1fc7b6-754a-4062-ab66-c18a23da1fb6",
        "title": "Blog",
        "description": "Trybe blog",
        "url": "https://blog.betrybe.com/",
        "favorite": false,
        "createdAt": "2023-02-15T17:58:03.524Z",
        "updatedAt": "2023-02-15T17:58:03.524Z",
        "mainTopics": []
      }
    ]  
  }
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmVhNmY3LTkzMzYtNDdiOC1iZTQ5LTRmMWY5ZmIwZDk2ZiIsImlhdCI6MTY3NjQ4NDM1NiwiZXhwIjoxNjc2NTcwNzU2LCJzdWIiOiJzZXJhcGhpbUBnbWFpbC5jb20ifQ.wvrZzDqmU34G2R1-D5iZiOzBcazMcgjBLvC5y3I0wig"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized      | Wrong email/password.  |

---

## 3. **Links**
[ Voltar para os Endpoints ](#5-endpoints)

O objeto Link é definido como:

| Campo      | Tipo   | Descrição                                     	|
| -----------|--------|-------------------------------------------------|
| id          | string | Identificador único do link.                   |
| title       | string | O nome do link.                                |
| description | string | Descrição do link.                             |
| url         | string | url atrelada ao link.                          |
| favorite    | boolean | Define se o link está favoritado ou não.      |
| mainTopics  | Date | Artigos encontrados do link.          		        |	
| createdAt   | Date | Data de criação do link.		                      |
| updatedAt   | Object | Data de atualização do link.                   |
| user        | Object | Informações do usuário dono do link.           |

### Endpoints

| Método   | Rota       | Descrição                               		            |
|----------|------------|---------------------------------------------------------|
| POST     | /links     | Criação de um link.                		                  |
| POST     | /links/link_id/favorite     | Favoritar um link.                 		|
| GET      | /links    | Lista informações do link              		              |
| PATCH    | /links/:link_id | Edita Informações de um link por ID                |
| DELETE   | /links/:link_id | Deleta um link por ID                              |
| DELETE   | /links/:link_id/unfavorite | Desfavorita um link por ID              |

---

### 3.1. **Criação de links**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links`

### Exemplo de Request:
```
POST /links
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
  "title": "Trybe",
  "description": "Blog Trybe",
  "url": "https://blog.betrybse.com/"
}
```

```
### Exemplo de Response:
```

201 Created

```json
{
  "id": "8f1fc7b6-754a-4062-ab66-c18a23da1fb6",
  "title": "Blogs",
  "description": "Blog blalbalbalb",
  "url": "https://blog.betrybse.com/",
  "user": {
    "id": "5f6ea6f7-9336-47b8-be49-4f1f9fb0d96f",
    "name": "Seraphim",
    "email": "seraphim@gmail.com",
    "createdAt": "2023-02-15T16:08:17.975Z",
    "links":  [
      {
        "id": "f8725a52-fa0c-4f69-8be6-95b84c0745bd",
        "title": "Trybe",
        "description": "Blog Trybe",
        "url": "https://blog.betrybe.com/",
        "favorite": false,
        "createdAt": "2023-02-15T16:08:58.169Z",
        "updatedAt": "2023-02-15T16:08:58.169Z"
        "mainTopics": []
      }
    ]
  },
  "favorite": false,
  "createdAt": "2023-02-15T17:58:03.524Z",
  "updatedAt": "2023-02-15T17:58:03.524Z"
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			               |
|----------------|-------------------------------|
| 401 Unauthorized | Missing Authorization.      |
| 401 Unauthorized | Field [url] is invalid, make sure you have the http verb. |
| 409 Conflict | Link's title or url is already saved. |
| 400 Bad Request | Missing fields.              |

---

### 3.2. **Criação de link favorito**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links/:link_id/favorite`

### Exemplo de Request:
```
POST /links/f8725a52-fa0c-4f69-8be6-95b84c0745bd/favorite
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
200 OK
```
```json
{
  "id": "f8725a52-fa0c-4f69-8be6-95b84c0745bd",
  "title": "Trybe",
  "description": "Blog Trybe",
  "url": "https://blog.betrybe.com/",
  "favorite": false,
  "createdAt": "2023-02-15T16:08:58.169Z",
  "updatedAt": "2023-02-15T16:08:58.169Z"
  "mainTopics": [
    {
      "id": "f8725a52-fa0c-4f69-8be6-95b84c0745bd"
      "name": "Article 1"
      "url": "http://trybe/article1"
    },
    {
      "id": "g8725a52-fa0c-4f69-8be6-95b84c0745bd"
      "name": "Article 1"
      "url": "http://trybe/article1"
    },
    {
      "id": "e8725a52-fa0c-4f69-8be6-95b84c0745bd"
      "name": "Article 1"
      "url": "http://trybe/article1"
    }
  ]
}
```

### Possíveis Erros:
| Código do Erro | Descrição 			         |
|----------------|-------------------------------|
| 401 Unauthorized | Missing Authorization.      |
| 401 Unauthorized | Invalid uuid.               |
| 404 Not Found    | Link not found.             |
| 409 Conflict     | Link is already in your favorite links.            |

---

### 3.3. **Listando links**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links`

### Exemplo de Request:
```
GET /links
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
200 OK
```
```json
[
  {
    "id": "f8725a52-fa0c-4f69-8be6-95b84c0745bd",
    "title": "Blog1",
    "description": "Blog1",
    "url": "https://blog.betrybe.com/",
    "favorite": false,
    "createdAt": "2023-02-15T16:08:58.169Z",
    "updatedAt": "2023-02-15T16:08:58.169Z"
  },
  {
    "id": "8f1fc7b6-754a-4062-ab66-c18a23da1fb6",
    "title": "Blog2",
    "description": "Blog2",
    "url": "https://blog2.betrybe.com/",
    "favorite": false,
    "createdAt": "2023-02-15T17:58:03.524Z",
    "updatedAt": "2023-02-15T17:58:03.524Z"
  }
]
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|

---
### 3.4. **Editando link por id**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links/:link_id`

### Exemplo de Request:
```
DELETE /links/f8725a52-fa0c-4f69-8be6-95b84c0745bd
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| link_id  | string      | Identificador único do link (Links) |

### Corpo da Requisição:
```json
{
   "title":"Blog Edited",
   "url":"https://blog.edited.com/"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
   "id":"f8725a52-fa0c-4f69-8be6-95b84c0745bd",
   "title":"Blog Edited",
   "description":"Blog1",
   "url":"https://blog.edited.com/",
   "favorite":false,
   "createdAt":"2023-02-15T17:58:03.524Z",
   "updatedAt":"2023-02-15T17:58:03.524Z"
}
```
### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized | Invalid uuid.      	 |
| 401 Unauthorized | Missing Authorization.      |
| 401 Unauthorized | Field [url] is invalid, make sure you have the http verb.   |
| 400 Bad Request    | The body is empty or there are only unrequested elements. |

---

### 3.5. **Deletando link por ID**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links/:link_id`

### Exemplo de Request:
```
DELETE /links/f8725a52-fa0c-4f69-8be6-95b84c0745bd
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| link_id  | string      | Identificador único do link (Links) |

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
204 No Content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized | Missing Authorization.      |
| 401 Unauthorized | Invalid uuid.               |
| 404 Not Found    | Link not found.             |
---

### 3.6. **Deletando link favorito**

[ Voltar para os Endpoints ](#5-endpoints)

### `/links/:link_id/unfavorite`

### Exemplo de Request:
```
DELETE /links/f8725a52-fa0c-4f69-8be6-95b84c0745bd/unfavorite
Host: https://collectionlinks.onrender.com
Authorization: Bearer Token Admin
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| link_id  | string      | Identificador único do link (Links) |

### Corpo da Requisição:
```json
Vazio
```
### Exemplo de Response:
```
204 No Content
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro | Descrição 			 |
|----------------|-------------------------------|
| 401 Unauthorized | Missing Authorization.      |
| 401 Unauthorized | Invalid uuid.               |
| 404 Not Found    | Link not found.             |
| 404 Bad Request  | Link is already unfavorited.   |
---








