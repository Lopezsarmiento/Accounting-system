# Accounting-system
Basic Accounting app using React and Nodejs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Inside the backend directory, you can run:

### `npm run start`

Runs both app and server in the production mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

## API Documentation
This API uses `POST`, `GET` requests to communicate and HTTP [response codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) to indentify status and errors. All responses come in standard JSON. All requests must include a `content-type` of `application/json` and the body must be valid JSON.

### Response Codes
```
200: Success
400: Bad request
404: Cannot be found
417: Expectation Failed
```

### Example Error Message
```json
http code 400
{
    "success": false,
    "error": "error message"
}
```
## Get list of transactions

### Request

    GET http://localhost:4000/api/v1/transactions

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {
        "success": true,
        "count": *number of transactions,
        "data": []
    }

## Create a new transaction

### Request

    POST http://localhost:4000/api/v1/transactions
    Content-Type: application/json
    {
      "type": "credit",
      "amount": 3000
    }

### Response

    HTTP/1.1 200 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: application/json
    Content-Length: 36

    {"success":true,"data":{}}

## Get a specific transaction

### Request

    GET http://localhost:4000/api/v1/appointments/:id
    Content-Type: application/json

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

    {"success":true,"data":{}
