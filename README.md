# AdminPro Backend

Backend NodeJS para crear una API RESTFUL que dará soporte al Frontend AdminPro hecho en Angular v11.x del curso de Fernando Herrera.

## Instalar dependencias
Instalar todos los paquetes de nuestro fichero \<package.json\>:  
```javascript
npm install
```

## Arrancar el server:

Ejecutar el script:

| npm run dev

## Instalar ESLINT, BABEL-ESLINT, PRETTIER

Todos los ejecutables del direcitorio \<node_modules/bin/\> se pueden ejeuctar con el comando \<npx\>

Instalar las dependencias de desarrollo:  

> npm i -D eslint babel-eslint prettier eslint-plugin-prettier eslint-config-prettier  

Crear el fichero de configuración \<eslint\>:  

> npx eslint --init

Añadir SCRIPT a nuestro \<package.json\>:  

```json
"scripts": {
    "dev": "nodemon --watch src src/index.js",
    "lint": "eslint ."
},
```

Ejecutar eslint para todo nuestro proyecto:  

> npm run lint  

Ejecutar eslint para un fichero concreto del proyecto:  

> npx eslint <path_file.js>  
> npx eslint ./src/app.js

### Crear fichero \<.prettierrc.json>
Este será el fichero de configuración de reglas para usar PRETTIER.  
Por defecto usaremos las siguientes reglas: 

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

### Configurar ESLINT para que gestione PRETTIER como PLUGIN

Configurar el fichero \<.eslintrc.json\> con la información siguiente:  

```json
{
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "prettier"],
  "plugins": ["prettier"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "prefer-destructuring": ["error", { "object": false, "array": false }],
    "prettier/prettier": "error"
  }
}
```

## Librerias adicionales

### Express-FileUpload

[Express FileUpload](https://www.npmjs.com/package/express-fileupload)
> npm i express-fileupload

### UUID

[UUID](https://www.npmjs.com/package/uuid)
> npm i uuid

