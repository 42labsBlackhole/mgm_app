## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#  Aplicação MGM
Esse repositório possui uma aplicação de uso livre e customizável para criação de um sistema de pontuação e resgate.

# STACK	
Construído utilizando o framework Vue.js e suas bibliotecas.

# Árvore de arquivos

<dl>

  <dt>node_modules</dt>
  <dd>possui todas as dependências do código criada pelo Node.</dd>
  <dt>📁public</dt>
  <dd>possui os arquivos diretamente interpretados pelo navegador.</dd>
  <dt>📁src</dt>
  <dd>contém todo o código de desenvolvimento do projeto.</dd>
  <dt>🐳Dockerfile</dt>
  <dd>Constroi e distribui a aplicação em um container Docker.</dd>
  <dt>package-lock.json</dt>
  <dd>Possui o endereço das dependências.</dd>
  <dt>package.json</dt>
  <dd>É um arquivo de configuração do projeto e suas principais dependências.</dd>
  <dt>server.js</dt>
  <dd>Utiliza a biblioteca Express para criar um servidor web em uma porta local.</dd>
</dl>

## public

<dl>
  <dt>favicon.ico</dt>
  <dd>É um icone que fica no tab do navegador.</dd>
  <dt>index.html</dt>
  <dd>Arquivo que é interpretado pelo navegador possui a chamada para os outros componentes do Vue.js</dd>
 </dl>
 
## src

<dl>
  <dt>assets</dt>
  <dd>Possui todas as imagens utilizadas no app.</dd>
  <dt>components</dt>
  <dd>Possui os componentes utilizados por cada página (view).</dd>
  <dt>router</dt>
  <dd>Arquivo de configuração para o Vue Router, que conecta as páginas em uma aplicação de página única (SPA).</dd>
  <dt>style</dt>
  <dd>CSS que múltiplos arquivos compartilham.</dd>
  <dt>views</dt>
  <dd>Cada uma das páginas do App</dd>
  <dt>App.vue</dt>
  <dd>Chamada do Vue Router para organização das páginas.</dd>
  <dt>main.js</dt>
  <dd>Importação de todos os plugins e criação da aplicação em Vue.js</dd>
 </dl>

## Dockerfile

 Cria um container **Docker** em utilizando **Node:16.13-bullseye**.
Todas as dependências são instaladas, logo após, os arquivos são colocados, o arquivo é compilado e o servidor web é acionado.

## server.js
Utiliza o framework Express para subir um servidor web local na porta especificada.

	Padrão: Port:8080

# API para MongoDB
Para aplicação funcionar utilizando um banco de dados, é necessário a criação de rotas:
`	app.route('/users').get(controller.users);
	app.route('/users').post(controller.createUser);
	app.route('/usersById/:id').get(controller.userID);
	app.route('/usersByCpf/:cpf').get(controller.userCpf);
	app.route('/usersCode/:code').get(controller.userCode);
	app.route('/users/:id').put(controller.updateUser);
	app.route('/users/:id').delete(controller.deleteUser);
app.route('/newCustomer/:code').post(controller.newCustomer);
	app.route('/reclaim/:id').get(controller.claimPrize);
	app.route('/buy/:id').post(controller.buyProduct);
app.route('/vouchers/:userId').get(controller.getVouchers);`

# .env

É necessário um .env que irá lidar com:
- VUE_APP_API_IP
	- a rota do servidor web da API.
- VUE_APP_RECOMM_IP
	- a rota do próprio front.
- VUE_APP_BITLY_TOKEN
	- token para encurtador de links.

## Contributors

- [Eduardo](https://github.com/dumendes99)
- [Gustavo](https://github.com/GustavoAriadno)
- [Jhonatan](https://github.com/jhonatan229)
- [Matheus](https://github.com/Matth0s)
- [Nayran](https://github.com/nayran)
- [Rafael](https://github.com/giyeo)


