# Boleto API

## Introdução

O boleto api é um app para verificação de número de boleto.

## Instalação

Abra o terminal (CMD), então baixe o projeto do repositório do github. Acesse o folder da aplicação, você verá o arquivo "app.dockerfile". Execute o comando abaixo para subir o projeto.

```bash
docker-compose up
```

\*Você tem que ter o docker instalado no seu computador.

## Iniciando a aplicação

Você não precisa de nada mais. Com a imagem e o conteiner do docker criados, e os modulos do node instalados, o app irá iniciar automaticamente. Tudo isso deve levar um tempinho para instalar.

## Abra o app

Você só precisa [clicar aqui](http://localhost:3000) ou abrir a URL <http://localhost:3000> no seu navegador.

## Como usar

Assim que a api estiver executando, envie um número de boleto como parametro para URL /boleto. Você pode usar o navegador, o POSTMAN ou sua ferramenta de testes de APIs favorita.

Exemplo:

```
http://localhost:3000/boleto/34191.79001 01043.510047 91020.150008 9 87820026300
```

\*Não se preocupe em remover espaços, pontos etc, a api vai remover tudo pra você.

### Testes

Para executar os testes, apenas execute o comando abaixo. Copie e cole em outro terminal.

```bash
docker exec -t boleto-api npm test
```

Se você estiver executando no Git Bash do Windows, adicione &quot;winpty&quot; antes da linha de comando. Veja abaixo.

```bash
winpty docker exec -t boleto-api npm test
```

### Não tenho o Docker instalado

Você não tem o Docker instalado, mas deve ter o node.
Se você tem o node instalado, apenas instale os "node_modules" com o comando: `npm install`, então, execute a api com o comando: `npm start` e os testes com o comando: `npm test`.
