# Documentação da API - StarCafé

## Introdução
A API StarCafé permite acessar o cardápio, realizar pedidos e consultar ou cancelar pedidos feitos na cafeteria. Todas as respostas são retornadas no formato JSON.

## Endpoints

### 1. GET /api/menu
**Descrição:** Retorna o cardápio da cafeteria, com todos os produtos disponíveis.

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Retorna com sucesso o cardápio.

**Exemplo de Requisição:**
```http
GET /api/menu HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
[
  {"nome": "Café com Leite", "preco": 5.0, "tamanho": "grande", "status": "pendente"},
  {"nome": "Pão de Queijo", "preco": 3.0, "tamanho": "médio", "status": "pendente"},
  {"nome": "Tapioca", "preco": 7.0, "tamanho": "grande", "status": "em preparação"},
  {"nome": "Bolo de Cenoura", "preco": 4.0, "tamanho": "grande", "status": "pronto"},
  {"nome": "Café Expresso", "preco": 3.0, "tamanho": "pequeno", "status": "pendente"}
]
```

---

### 2. POST /api/order
**Descrição:** Permite que um cliente faça um pedido.

**Cabeçalhos da Requisição:**
- `Content-Type: application/json` → Indica que o corpo da requisição está em JSON.
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `201 Created` → Pedido criado com sucesso.
- `400 Bad Request` → Erro ao criar o pedido (exemplo: pedido vazio ou item inexistente).

**Exemplo de Requisição:**
```http
POST /api/order HTTP/1.1
Host: api.starcafe.com
Content-Type: application/json
Accept: application/json

{
  "itens": ["Café com Leite", "Pão de Queijo"]
}
```

**Exemplo de Resposta:**
```json
{
  "message": "Pedido realizado com sucesso!",
  "pedido": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "itens": [
      {"nome": "Café com Leite", "preco": 5.0, "status": "pendente"},
      {"nome": "Pão de Queijo", "preco": 3.0, "status": "pendente"}
    ],
    "status": "pendente"
  }
}
```

---

### 3. GET /api/order/:id
**Descrição:** Consulta o status de um pedido.

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Pedido encontrado.
- `404 Not Found` → Pedido não encontrado.

**Exemplo de Requisição:**
```http
GET /api/order/123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "itens": [
    {"nome": "Café com Leite", "preco": 5.0, "status": "pendente"}
  ],
  "status": "pendente"
}
```

---

### 4. DELETE /api/order/:id
**Descrição:** Cancela um pedido (caso ainda não tenha sido preparado).

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Pedido cancelado com sucesso.
- `403 Forbidden` → Pedido não pode ser cancelado pois já está em andamento ou finalizado.
- `404 Not Found` → Pedido não encontrado.

**Exemplo de Requisição:**
```http
DELETE /api/order/123e4567-e89b-12d3-a456-426614174000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
{
  "message": "Pedido cancelado com sucesso!"
}
```

---

## Cabeçalhos HTTP
- `Content-Type: application/json` → Indica que o corpo da requisição e resposta está em JSON.
- `Accept: application/json` → Indica que o cliente espera uma resposta em JSON.

## Tecnologias Utilizadas
- Node.js
- Express
- UUID para identificação de pedidos e produtos

## Como Executar
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   npm start
   ```
3. Acesse a API em `http://localhost:3000/api`
