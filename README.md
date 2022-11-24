# Node.js Intern Assignment - Zekademy

## Routes ##
1. POST /register
    Attribute  | Type
    ------------- | -------------
    email  | String
    first_name  | String
    last_name  | String
    password  | String
    age  | Integer
    city  | String

2. POST /login
    Attribute  | Type
    ------------- | -------------
    email  | String
    password  | String

3. POST /upload [Protected]
     Attribute  | Type
    ------------- | -------------
    image  | Image

4. GET /image [Protected]
     Params  | Type
    ------------- | -------------
    image_id  | Image Key

## ENVIROMENT VARIABLES ##

Key  | Value
------------- | -------------
PORT  | 8000
NODE_ENV  | development/production
DB_USERNAME  | `database username`
DB_PASSWORD  | `database password`
DB_NAME  | `database name`
DB_HOST  | `database host`
JWT_SECRET  | `JWT secret key`
AWS_ACCESS_KEY_ID  | `AWS ACCESS KEY ID`
AWS_SECRET_ACCESS_KEY  | `AWS SECRET ACCESS KEY`
AWS_REGION  | `AWS REGION`
AWS_BUCKET_NAME  | `AWS BUCKET NAME`
MAIL_EMAIL  | `Gmail account username`
MAIL_PASSWORD  | `Gmail account password`