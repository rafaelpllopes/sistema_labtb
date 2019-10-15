# SISTEMA LABTB

## Sobre o Projeto

Este projeto visa a criação de um sistema para registro dos laudos realizados pelo laboratorio de tuberculose do municipio, gerar relatorios dos laudos e estruturar laudos por paciente.

## Feito Com

- Backend: api feita em Nodejs, utilizando o microframework express;
- Frontend: foi utilizado o framawork Angular;
- Banco de dados: sqlite3, pois o sistema esta em uso em um computado da unidade.

## Para utilizar

Ter uma copia do projeto no computador, ter nodejs instalado, e instalar as dependencias via npm.

### Estrutura
```bash
api/
├── clusters.js
├── config
│   ├── async-wrap.js
│   ├── auth.js
│   ├── database.js
│   └── middlewares.js
├── controllers
│   ├── aspectos-controller.js
│   ├── laudos-controller.js
│   ├── materiais-controller.js
│   ├── pacientes-controller.js
│   ├── reports-controller.js
│   ├── resultados-controller.js
│   ├── unidades-controller.js
│   └── usuarios-controller.js
├── helpers
│   ├── ultimo-dia-mes.js
│   └── zfill.js
├── infra
│   ├── aspectos-dao.js
│   ├── laudos-dao.js
│   ├── materiais-dao.js
│   ├── pacientes-dao.js
│   ├── reports-dao.js
│   ├── resultados-dao.js
│   ├── unidades-dao.js
│   └── usuarios-dao.js
├── labtb.cert
├── labtb.db
├── labtb.key
├── models
│   ├── laudo.js
│   ├── pacientes.js
│   └── usuario.js
├── package.json
├── package-lock.json
├── public
│   ├── 10.a7a5757f7b5832125731.js
│   ├── 1.c8c953e5e47cf58c546d.js
│   ├── 3rdpartylicenses.txt
│   ├── 6.cf533c261b7463860c2b.js
│   ├── 7.87de66231695a72b061d.js
│   ├── 8.ccc8bc5ed32419e4c355.js
│   ├── 9.8dc6ebe38ec49c12ba90.js
│   ├── assets
│   │   ├── brasao.png
│   │   ├── governo.png
│   │   ├── logo.jpg
│   │   ├── timbre novo.png
│   │   ├── timbrev2.1.png
│   │   └── timbrev2.2.png
│   ├── common.b4bbaff52d39f0544235.js
│   ├── favicon.ico
│   ├── fontawesome-webfont.674f50d287a8c48dc19b.eot
│   ├── fontawesome-webfont.912ec66d7572ff821749.svg
│   ├── fontawesome-webfont.af7ae505a9eed503f8b8.woff2
│   ├── fontawesome-webfont.b06871f281fee6b241d6.ttf
│   ├── fontawesome-webfont.fee66e712a8a08eef580.woff
│   ├── index.html
│   ├── main.e07728b874b6f8e6e34e.js
│   ├── polyfills.198cefcda44252f9ddcc.js
│   ├── runtime.ff82b4819a822c4618a8.js
│   └── styles.5579077cf97cc15504fb.css
├── routes
│   ├── aspectos-route.js
│   ├── index-route.js
│   ├── laudos-route.js
│   ├── materiais-route.js
│   ├── pacientes-route.js
│   ├── reports.js
│   ├── resultados-route.js
│   ├── unidades-route.js
│   └── usuarios-route.js
├── secret.txt
├── server.js
└── test
    ├── 1-api-raiz.test.js
    ├── 2-api-aspectos.test.js
    ├── 3-api-materias.test.js
    ├── 4-api-unidades.test.js
    ├── 5-api-resultados.test.js
    ├── 6-api-pacientes.test.js
    ├── 7-api-laudos.test.js
    ├── 8-api-reports.test.js
    ├── 9-api-usuarios.test.js
    └── stop-app.js
  ```

## Recomendação para certificado https
- Dev: utilizar labtb.key e labtb.cert "http://www.selfsignedcertificate.com/ para gerar o certificado;
- Produção: Utilizar o Let's Encrypt.
