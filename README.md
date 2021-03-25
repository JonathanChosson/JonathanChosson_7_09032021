# Projet Groupomania

## Explication du TP
### Créer un réseau social d'entreprise
Développement (Frontend et Backend) d'un réseau social d'entreprise pour une société fictive Groupomania.  

BackEnd :   
 - Création de l'API REST
 - Sécurisation
 - Respect du RGPD
 - Codumentation de l'API https://documenter.getpostman.com/view/14193855/TzCHCATs

FrontEnd : 
- Création d'un message
- Accès à tout les messages
- Modification de ses propres messages
- Suppresion de ses propres messages
- Personalisation du profil
- Like des messages

Base de données : 
- Mysql 8.0.23
- Sequelize 

## Fabriqué avec 
<img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
<img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
<img alt="Vue.js" src="https://img.shields.io/badge/vuejs%20-%2335495e.svg?&style=for-the-badge&logo=vue.js&logoColor=%234FC08D"/>
<img alt="Bootstrap" src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img alt="Git" src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/>
<img alt="Docker" src="https://img.shields.io/badge/docker%20-%230db7ed.svg?&style=for-the-badge&logo=docker&logoColor=white"/>


## Installation
### Avec Docker (recommandé)
1. **Cloner le dépot Github**
```bash
git clone https://github.com/JonathanChosson/JonathanChosson_6_26012021.git
```
2. **Lancer les différents éléments avec docker-compose**
```bash
cd JonathanChosson_6_26012021.git
docker-compose up --build -d
```
3. **Essayer l'application**
- Le réseau social accessible à l'adresse : localhost:8080
- Le backend est accessible à l'adresse : localhost:3000
- la BDD est accessible à l'adresse : localhost:3307
```bash
mysql -uUSERNAME -pPASSWORD -h 127.0.0.1 -P 3307 --protocol=tcp
```

### Manuellement (non-recommandé)
1. **Cloner le dépot Github**
```bash
git clone https://github.com/JonathanChosson/JonathanChosson_6_26012021.git
```
2. **Initialiser votre BDD**
Connectez vous à votre mysql puis créer la base de données
```bash
CREATE DATABASE database_development_test
```
Charger ensuite le fichier projet6.sql que vous trouverez dans \JonathanChosson_7_09032021\BDD\
```bash
SOURCE "EMPLACEMENT DU FICHIER projet6.sdl"
```
3. **Initialiser le backEnd**
Editez le fichier .env que vous trouverez dans \JonathanChosson_7_09032021\Back\
```bash
TOKEN_JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxMTczOTYwMSwiaWF0IjoxNjExNzM5NjAxfQ.g-hcbPqOZ5DyWdeluvb0y1_GK4nJ-dw_M4FCXqYfW7E'
DB_USER=USERNAME //Votre nom d\'utilisateur qui as les droits sur la BDD
DB_PASSWORD=PASSWORD //le mot de passe de l\'utilisateur qui as les droits
DB_HOST=localhost
```
Charger ensuite les dépendances 
```bash
npm install
```
Lancer ensuite le serveur 
```bash
npm start
```
4. **Initialiser le frontEnd**
Charger les dépendances 
```bash
yarn install
```
Lancer ensuite le serveur 
```bash
yarn serve
```
3. **Essayer l'application**
- Le réseau social accessible à l'adresse : localhost:8080
- Le backend est accessible à l'adresse : localhost:3000
- la BDD est accessible à l'adresse : localhost:3306
```bash
mysql -uUSERNAME -pPASSWORD -h 127.0.0.1 -P 3306 --protocol=tcp
```

### Utilisateurs pré-enregistré
1. **Afin de rendre le projet moins vide des utilisateurs on été crées**
```bash
Identifiant : toto@toto.com Mot de passe : tototo Droits: Utilisateur
Identifiant : tata@tata.com Mot de passe : tatata Droits: Utilisateur
Identifiant : admin@admin.com Mot de passe : admin Droits: Administration
```
## Auteur
<img src='https://img.shields.io/badge/Autor-Chosson Jonathan-blue' />
<img src="https://img.shields.io/github/followers/JonathanChosson.svg?style=social&label=Follow&maxAge=2592000" />

## Licence 
<img src='https://forthebadge.com/images/badges/open-source.svg' />
