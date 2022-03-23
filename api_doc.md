# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /user/register`
- `POST /user/login`
- `GET /user/email`
- `POST /user/card`
- `PATCH /user/update`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "User Created",
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Name is required"
}
OR
{
  "message": "Password is required"
}
```
&nbsp;

## 2. POST /user/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "access_token": "string",
    "email": "string",
    "PlanId": "integer",
    "isCardSaved": "boolean",
    "card": "object"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "User not found Authentication Failed"
}

## 3. GET /user/email

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json

   [
       {
           "email":"string"
       },
       {
           "email":"string"
       },
       {
           "email":"string"
       },
   ]

```

## 4. POST /user/card

Request:

- header:

```json
{
  "access_token": "string",
  
}
```

- body:

```json
{
  "token": "string",
  "email": "string"
}
```

_Response (200 - OK)_

```json

{
    "message": "StripeCardId add success"
}

```



## 5. PATCH /user/update

Request:

- header:

```json
{
  "access_token": "string",
  
}
```

- body:

```json
{
  "email": "string",
  "PlanId": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Stripe Subscription Updated"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
   "message": "JWT must be provided"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


