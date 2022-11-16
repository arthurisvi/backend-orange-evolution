# Orange Evolution - Backend

## Como rodar a aplicação (DEV)
1. Instale as dependências do projeto
```
$ npm i
```

2. Configure o banco de dados
* Crie uma cópia do .env.example
* Altere o nome do arquivo para .env
* Altere as seguintes variáveis com suas configurações
```
PG_USER=
PG_PASSWORD=
PG_DB_NAME=
EMAIL_ADMIN=
PASSWORD_ADMIN=
```
OBS: EMAIL_ADMIN e PASSWORD_ADMIN referem-se ao usuário administrador que será criado no banco de dados*

2.1 Rode as migrations e seeders
```
$ node ace migration:run
$ node ace db:seed
```

3. Inicie a aplicação
```
$ npm run dev
```

## Modelagem de dados
![image](https://user-images.githubusercontent.com/83462514/202066304-1900cacc-39dc-4bb6-9bdd-f8d49c3b8b93.png)

