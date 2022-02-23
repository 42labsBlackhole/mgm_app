import { createRouter, createWebHistory } from "vue-router";
import Indicado from "../views/Indicado.vue";
import Cliente from "../views/Cliente.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ExternalForm from "../views/ExternalForm.vue";

const routes = [
  {
    path: "/indicado/",
    name: "Indicado",
    component: Indicado,
  },
  {
    path: "/cliente/:id",
	params: true,
    name: "Cliente",
    component: Cliente,
  },
  {
  	path: "/register",
  	name: "Register",
  	component: Register,
  },
  {
  	path: "/",
  	name: "Login",
  	component: Login,
  },
  {
	path: "/externalform/:code",
	params: true,
	name: "ExternalForm",
	component: ExternalForm,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
