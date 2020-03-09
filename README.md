# Adonis API application

Servidor API em AdonisJS

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
6. Mails
7. Jobs
8. Sentry
9. Redis
10.Hooks
11.Validators
12.Internationalization

## Setup

clone o repositorio e execute `npm install`.


### Migrations

Execute o seguinte comando para executar migrações de inicialização.

```js
adonis migration:run
```

## Run
```bash
adonis serve --dev
```

### Banco de dados para envio de emals

```bash
docker run --name redis -p 6379:6379 -d redis:alpine
```
### Rodar os jobs

```bash
adonis kue:listen
```
