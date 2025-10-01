
# API - BookShelf

Essa API permite gerenciar uma lista de livros, incluindo funcionalidades para buscar, adicionar, atualizar e excluir livros.
## Documentação da API

#### Retorna todos os livros

```http
  GET /api/books
```

#### Retorna um livro pelo id

```http
  GET /api/books/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do livro que você quer |

#### Retorna os livros para o filtro informado (Título ou Autor)

```http
  GET /api/books?filtro=Seu filtro por título ou autor
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `filtro`      | `string` | Filtro para consulta por título ou autor do livro |

#### Adiciona um novo livro

```http
  POST /api/books
```

| Parâmetro JSON  | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `title`      | `string` | **Obrigatório**. Título do livro |
| `author`      | `string` | **Obrigatório**. Autor do livro |
| `genre`      | `string` | Gênero literário |
| `year`      | `number` | Ano de publicação |
| `rating`      | `number` | Avaliação de 1-5 estrelas |
| `pages`      | `number` | Número de páginas |
| `synopsis`      | `string` | Sinopse/descrição do livro |
| `status`      | `string` | **SÃO ACEITOS**: QUERO_LER, LENDO, LIDO, PAUSADO, ABANDONADO |
| `cover`      | `string` | URL da capa |

```bash
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Ficção Científica",
    "year": 1949,
    "rating": 5,
    "pages": 328,
    "synopsis": "Distopia sobre um futuro totalitário.",
    "status": "LENDO",
    "cover": "https://examplo.com/capa.jpg"
  }
```


#### Atualiza um livro

```http
  PUT /api/books/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Id do livro a ser atualizado |

```bash
  {
    "status": "PAUSADO"
  } 
```

#### Exclui um livro

```http
  DELETE /api/books/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Id do livro a ser excluído |

#### Retorna todos os gêneros

```http
  GET /api/genres
```

#### Retorna um gênero pelo id

```http
  GET /api/genres/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do gênero que você quer |

#### Retorna todos os livros de um gênero

```http
  GET /api/books/genres/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do gênero que você quer |

#### Adiciona um novo gênero

```http
  POST /api/genres
```

| Parâmetro JSON  | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do gênero |

```bash
  {
    "name": "Infantil"
  }
```

#### Atualiza um gênero

```http
  PUT /api/genres/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Id do gênero a ser atualizado |

```bash
  {
    "name": "Biologia"
  } 
```

#### Exclui um gênero

```http
  DELETE /api/genres/id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Id do gênero a ser excluído |