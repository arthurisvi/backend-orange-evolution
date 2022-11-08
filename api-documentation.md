# Orange Evolution - Documentação de rotas da API


## /user
#### [POST] /register
* Entrada
```json
{
	"name": "Arthur",
	"email": "teste@gmail.com",
	"password": "arthur"
}
```

* Retorno
```json
{
	"type": "bearer",
	"token": "MQ.C8psOX2t5EsWYH3FGyVA__NaJNa0DwHfYoqOdSfvWOJFBSGEmippq7XWhcL-",
	"expires_at": "2022-11-17T21:43:06.859-03:00"
}
```

#### [POST] /login
```json
{
	"email": "teste@gmail.com",
	"password": "arthur"
}
```


#### [GET] /myProfile -> retorna o usuário logado e seus dados
Exige o bearer token no header da requisição

* Retorno
```json
{
	"id": "2fcdd5ad-69ee-4d8a-a828-85b81e3bb297",
	"name": "Arthur",
	"email": "teste@gmail.com",
	"remember_me_token": null,
	"tag": "member",
	"created_at": "2022-11-07T21:43:06.598-03:00",
	"updated_at": "2022-11-07T21:43:06.625-03:00",
	"trails": [
		{
			"id": "1b8b308c-833d-4a32-af92-82a563155053",
			"name": "Desenvolvimento Full Stack",
			"description": "O desenvolvedor full stack é o profissional habilitado para compreender e operar em todas as camadas do desenvolvimento de um projeto, desde a criação de servidores internos (Backend) até interfaces de comunicação com o usuário final (Frontend).",
			"estimated_time": 50,
			"created_at": "2022-11-07T21:42:40.847-03:00",
			"updated_at": "2022-11-07T21:42:40.863-03:00"
		},
	]
}
```

#### [GET] /getMyTrails -> exibe as trilhas que o usuário está cadastrado
Exige o bearer token no header da requisição
* Retorno 
```json
[
	{
		"id": "1b8b308c-833d-4a32-af92-82a563155053",
		"name": "Desenvolvimento Full Stack",
		"description": "O desenvolvedor full stack é o profissional habilitado para compreender e operar em todas as camadas do desenvolvimento de um projeto, desde a criação de servidores internos (Backend) até interfaces de comunicação com o usuário final (Frontend).",
		"estimated_time": 50,
		"created_at": "2022-11-07T21:42:40.847-03:00",
		"updated_at": "2022-11-07T21:42:40.863-03:00"
	}
]
```

#### [POST] /signTrail -> usuário se registra em uma trilha
Exige o bearer token no header da requisição

* Entrada
```json
{
    "idTrail": "74972a84-2711-4847-8849-13ea3f5314e8"
}
```

* Retorno 
```json
{
	"message": "Usuário cadastrado na trilha QA (Quality Assurance)"
}
```

#### [POST] /contentStatus -> marcar status do conteúdo 
Exige o bearer token no header da requisição

* Entrada
```json
{
	"status": "finished",
	"idContent": "9b241469-0820-427c-8685-b21fa727f9fb"
}
```

* Retorno 
```json
{
	"content_id": "9b241469-0820-427c-8685-b21fa727f9fb",
	"user_id": "2fcdd5ad-69ee-4d8a-a828-85b81e3bb297",
	"status": "finished",
  "favorite": false,
	"id": "1cbbf8a1-8ab9-47b6-8cad-a375aa5584d1",
	"created_at": "2022-11-07T22:13:49.639-03:00",
	"updated_at": "2022-11-07T22:13:49.639-03:00"
}
```

#### [POST] /favoriteContent -> marcar conteúdo como favorito
Exige o bearer token no header da requisição

* Entrada
```json
{
	"favorite": true,
	"idContent": "9b241469-0820-427c-8685-b21fa727f9fb"
}
```

* Retorno 
```json
{
	"id": "1cbbf8a1-8ab9-47b6-8cad-a375aa5584d1",
	"user_id": "2fcdd5ad-69ee-4d8a-a828-85b81e3bb297",
	"content_id": "9b241469-0820-427c-8685-b21fa727f9fb",
	"status": "finished",
	"favorite": true,
	"created_at": "2022-11-07T22:13:49.639-03:00",
	"updated_at": "2022-11-07T23:52:37.839-03:00"
}
```
