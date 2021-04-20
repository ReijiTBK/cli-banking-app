# CLI-Banking-App

To run the application, we are assuming that NodeJS and necessary npm CLI are setup correctly, If it is not, please visit
https://nodejs.org/en/ to install the necessary packages

To begin:

```
//Install the necessary packages
npm install

//Run the app, this script will run typescript build and start the app
npm run start

//To just build the app
npm run build

//To run test
npm run test or npm test
```

## Assumptions

1. There is no decimal value for this bank
1. Simulating DB via the DB class, even though there are OBR(Object by Ref) when updating values, it will still go through DB class to call the action
1. First Owe First Pay, if I owe a user first, I will pay that user first

## Future To-Dos

1. More refactoring of index class, for menu display
1. A more efficient fethching list of users who are debted to user

## Cheap thrill(s)

1. Login id is case-insensitive
1. Quit function

## Commands Available

1. login \<client\> : Login as client.
2. topup \<amount\> : Increase logged-in client balance by amount
3. pay \<another_client\> \<amount\> : Pay amount from logged-in client to another_client, maybe in parts, as soon as possible.
4. quit : Quit CLI Banking App
