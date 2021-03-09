# User Api

Api para el registro y la autenticacion de usuarios.

## Índice
*  **[Requerimientos](#-requerimientos)**
*  **[Despliegue](#-despliegue-local)**
*  **[Tests](#-generación-de-apks-e-ipas)**
*  **[Servicios](#%EF%B8%8F-generación-de-servicios)**

## Requerimientos

```
node v14.16.0
npm@6.14.11
PostgreSQL
```

## Despliegue
### Proceso
1. Clonar el proyecto.
```
git clone xxxx
```
2. instalar dependencias.
```
npm install
```
3. configuracion de base de datos.
   en el archivo que esta en la raiz del proyecto `.env` se debe de editar la variable `DATABASE_URL` con los datos
   correspondientes a la configuracian de postgres.
```
DATABASE_URL=postgres://user:password@server:port/database               
```
4. creacion de tablas.
   La creacion de la tabla correspondiente para el proyecto se puede realizar de dos maneras, y la misma se creara en la
   base de datos selecionada en el paso anterior.

**Script**
Mediante la creacion de un script creado ejecutando en el terminal:
```
npm run create-dev-tables               
```

**PostgreSQL**
Mediante la consola de PostgreSQL ejecutando el siguiente comando:
```
CREATE TABLE IF NOT EXISTS users
 (id SERIAL PRIMARY KEY,
 email VARCHAR(100) UNIQUE NOT NULL,
 full_name VARCHAR(100),
 address VARCHAR(100),
 phone VARCHAR(100),
 password VARCHAR(100) NOT NULL,
 created DATE NOT NULL)              
```

4. Ejecutar el proyecto.
```
node app.js
```

## test
El proyecto cuenta con pruebas unitarias basicas, las mismas son:
* Registro de un usuario.
* Login de usuario.
* Eliminar el usuario creado.

para ejecutarlas se introduce el siguiente comando en el terminal.
```
npm test
```

## Servicios
La api cuenta con 3 servicios los mismos son:
* signup
```
Tipo: Post
Url: /api/auth/signup
Ejemplo request body:
{
'email' : 'w3@g.com',
'full_name' : 'wilder',
'address' : 'Venezuela, Caracas',
'phone' : '+585555555',
'password' : '12345678'
}
Ejemplo de response:
{
"status": "success",
"data": {
"id": 23,
 "email": "w3@g.com",
 "full_name": "wilder",
 "created_on": "2021-03-07T04:00:00.000Z",
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InczQGcuY29tIiwidXNlcl9pZCI6MjMsImZpcnN0X25hbWUiOiJ3aWxkZXIiLCJsYXN0X25hbWUiOiJydW1ib3MiLCJpYXQiOjE2MTUxNDkzNDEsImV4cCI6MTYxNTQwODU0MX0._lDYjN8uEVtndzALiL37zy_Kd7lufeLd0BooOWzb_Gk"
}
}
```
* signin
```
Tipo: Post
Url: /api/auth/signin
Ejemplo request body:
{
'email' : 'w3@g.com',
'password' : '12345678'
}
Ejemplo de response:
{
"status": "success",
"data": {
"id": 23,
 "email": "w3@g.com",
 "full_name": "wilder",
 "created_on": "2021-03-07T04:00:00.000Z",
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InczQGcuY29tIiwidXNlcl9pZCI6MjMsImZpcnN0X25hbWUiOiJ3aWxkZXIiLCJsYXN0X25hbWUiOiJydW1ib3MiLCJpYXQiOjE2MTUxNDkzNDEsImV4cCI6MTYxNTQwODU0MX0._lDYjN8uEVtndzALiL37zy_Kd7lufeLd0BooOWzb_Gk"
}
}
``` 
* delete
```
Tipo: Delete
Url: /api/users/delete
Ejemplo request body:
{
"email" : "w3@g.com"
}
Ejemplo de response:
"success"
```
* getall
```
Tipo: Get
Url: /api/users/getall
Ejemplo de response:
{
"id": 22,
"full_name": "wilder"
},
{
"id": 23,
"full_name": "wcode"
},
```

