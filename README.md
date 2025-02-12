# Documentação da API StarCafé

## Introdução
A API StarCafé permite acessar o cardápio, realizar pedidos e consultar ou cancelar pedidos feitos na cafeteria. Todas as respostas são retornadas no formato JSON.

## Endpoints

### 1. GET /menu
**Descrição:** Retorna o cardápio da cafeteria.

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Retorna com sucesso o cardápio.
- `500 Internal Server Error` → Erro ao buscar o menu.

**Exemplo de Requisição:**
```http
GET /menu HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
  { "id": 1, "nome": "Café Expresso", "preco": 5.0 },
  { "id": 2, "nome": "Cappuccino", "preco": 7.5 }
]
```

---

### 2. POST /order
**Descrição:** Permite que um cliente faça um pedido.

**Cabeçalhos da Requisição:**
- `Content-Type: application/json` → Indica que o corpo da requisição está em JSON.
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `201 Created` → Pedido criado com sucesso.
- `400 Bad Request` → Erro ao criar o pedido (exemplo: pedido vazio).
- `500 Internal Server Error` → Erro inesperado no servidor.

**Exemplo de Requisição:**
```http
POST /order HTTP/1.1
Host: api.starcafe.com
Content-Type: application/json
Accept: application/json

{
  "itens": [
    { "id": 1, "quantidade": 2 },
    { "id": 3, "quantidade": 1 }
  ]
}
```

**Exemplo de Resposta:**
```json
HTTP/1.1 201 Created
Location: /order/1700000000000
Content-Type: application/json

{
  "message": "Pedido criado com sucesso!",
  "pedido": {
    "id": 1700000000000,
    "itens": [
      { "id": 1, "quantidade": 2 },
      { "id": 3, "quantidade": 1 }
    ],
    "status": "recebido"
  }
}
```

---

### 3. GET /order/:id
**Descrição:** Consulta o status de um pedido.

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Pedido encontrado.
- `404 Not Found` → Pedido não encontrado.
- `500 Internal Server Error` → Erro inesperado no servidor.

**Exemplo de Requisição:**
```http
GET /order/1700000000000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Pedido encontrado",
  "pedido": {
    "id": 1700000000000,
    "itens": [
      { "id": 1, "quantidade": 2 }
    ],
    "status": "recebido"
  }
}
```

---

### 4. DELETE /order/:id
**Descrição:** Cancela um pedido (caso ainda não tenha sido preparado).

**Cabeçalhos da Requisição:**
- `Accept: application/json` → Indica que o cliente deseja receber a resposta no formato JSON.

**Códigos de Status:**
- `200 OK` → Pedido cancelado com sucesso.
- `400 Bad Request` → Pedido não pode ser cancelado (já foi preparado ou está em andamento).
- `404 Not Found` → Pedido não encontrado.
- `500 Internal Server Error` → Erro inesperado no servidor.

**Exemplo de Requisição:**
```http
DELETE /order/1700000000000 HTTP/1.1
Host: api.starcafe.com
Accept: application/json
```

**Exemplo de Resposta:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Pedido cancelado com sucesso!"
}
```

---

## Considerações Finais
- Todos os endpoints retornam respostas no formato JSON.
- Os cabeçalhos HTTP garantem a comunicação adequada entre cliente e servidor.
- Erros são tratados com os códigos de status apropriados.
```

