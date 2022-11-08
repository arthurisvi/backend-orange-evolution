# Orange Evolution - Documentação de rotas da API


## /user
### [POST] /register
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

### [POST] /login
* Entrada
```json
{
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


### [GET] /myProfile -> retorna o usuário logado e seus dados
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

### [GET] /getMyTrails -> exibe as trilhas que o usuário está cadastrado
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

### [POST] /signTrail -> usuário se registra em uma trilha
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

### [POST] /contentStatus -> marcar status do conteúdo 
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

### [POST] /favoriteContent -> marcar conteúdo como favorito
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

## /trail

### [GET] /getAll -> retorna todas as trilhas da plataforma
Exige o bearer token no header da requisição

* Retorno 
```json
[
	{
		"id": "d25495f2-7a67-432e-afb6-49c2748b6182",
		"name": "UI/UX Design",
		"description": "Enquanto o foco do UI design é a criação de uma interface amigável, o UX é voltado para a maneira como o usuário vive o uso de um produto. O UI trata dos elementos com os quais o usuário interage, ao passo que o UX procura entender os comportamentos e emoções dessas pessoas no uso do produto.",
		"estimated_time": 30,
		"created_at": "2022-11-07T21:42:40.986-03:00",
		"updated_at": "2022-11-07T21:42:40.987-03:00"
	},
	{
		"id": "74972a84-2711-4847-8849-13ea3f5314e8",
		"name": "QA (Quality Assurance)",
		"description": "O Quality Assurance é o conjunto de atividades que tentam garantir que o produto ou serviço oferecidos esteja de acordo com o nível de qualidade exigido. O trabalho do profissional de QA envolve um processo sistemático de realização de testes focado no processo de desenvolvimento. Isso é necessário para garantir que o produto final não chegue às mãos do cliente com erros ou problemas de mau funcionamento.",
		"estimated_time": 180,
		"created_at": "2022-11-07T21:42:40.981-03:00",
		"updated_at": "2022-11-07T21:42:40.981-03:00"
	},
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
### [GET] /getContents/:id_trilha -> retorna todos os conteúdos de uma trilha específica
Exige o bearer token no header da requisição

```json
[
	{
		"id": "850954b5-da37-4787-8b72-fc30587319cd",
		"title": "Trilha Fullstack - conteudo 2",
		"type": "Artigo",
		"duration": "12:20",
		"link": "alura.com",
		"author": "Alura",
		"trail_id": "1b8b308c-833d-4a32-af92-82a563155053",
		"category": "basicConcepts",
		"created_at": "2022-11-07T22:10:47.316-03:00",
		"updated_at": "2022-11-07T22:10:47.333-03:00"
	},
	{
		"id": "9b241469-0820-427c-8685-b21fa727f9fb",
		"title": "Trilha Fullstack - conteudo 3",
		"type": "Artigo",
		"duration": "12:20",
		"link": "alura.com",
		"author": "Alura",
		"trail_id": "1b8b308c-833d-4a32-af92-82a563155053",
		"category": "basicConcepts",
		"created_at": "2022-11-07T22:13:29.526-03:00",
		"updated_at": "2022-11-07T22:13:29.535-03:00"
	},
	{
		"id": "4705be11-75e0-4e47-bdbe-1681ea2d58d0",
		"title": "Conteudo Editadoo",
		"type": "artigo",
		"duration": "21:21",
		"link": "google.com",
		"author": "Arthur ISVI",
		"trail_id": "1b8b308c-833d-4a32-af92-82a563155053",
		"category": "initial",
		"created_at": "2022-11-07T21:59:19.396-03:00",
		"updated_at": "2022-11-08T00:04:22.782-03:00"
	}
]
```
