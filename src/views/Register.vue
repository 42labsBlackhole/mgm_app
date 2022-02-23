<template>
  <div id="page">
    <div id="login">
      <img
        tabindex="1"
        alt="Página de cadastro Re-Comm"
        src="../assets/logo_vivo_recomm.png"
      />
      <input
        tabindex="1"
        v-model="name"
        type="text"
        placeholder="Nome"
        @keyup.enter="register"
      />
      <br />
      <input
        tabindex="1"
        v-model="cpf"
        type="text"
        placeholder="CPF"
        v-maska="'###.###.###-##'"
        @keyup.enter="register"
      />
      <br />
      <input
        tabindex="1"
        v-model="passwd"
        type="password"
        placeholder="Insira sua senha"
        @keyup.enter="register"
      />
      <span tabindex="2" v-show="invalid">{{ msg }}</span>
      <button tabindex="1" class="button" @click="register">Registrar</button>
      <p tabindex="3">
        Já possui conta? <a id="link" href="#" @click="login">Faça login!</a>
      </p>
    </div>
    <ModalRedic v-if="validVivo" @close="closeModal">
      <template v-slot:header>
        <p class="Modal" tabindex="2">
          Parece que você ainda não é um cliente VIVO
        </p>
      </template>
      <template v-slot:body>
        <p tabindex="2" class="Modal">
          Para conferir nossos planos e serviços
          <a
            tabindex="2"
            id="link"
            target="_blank"
            href="https://www.vivo.com.br/para-voce/produtos-e-servicos"
            @click="register"
            >clique aqui</a
          >
        </p>
      </template>
    </ModalRedic>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import ModalRedic from "../components/ModalRedic.vue";
import { cpf } from 'cpf-cnpj-validator';

export default {
  name: "Register",
  data() {
    return {
      invalid: false,
      name: "",
      msg: "",
      cpf: "",
      validVivo: "",
			passwd: ""
    };
  },
  components: { ModalRedic },
  methods: {
    register() {
      if (
        this.name < 2 ||
        !/^[a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚ]+$/.test(this.name)
      ) {
        this.invalid = true;
        this.msg = "Nome inválido";
        return;
      }
      if (this.cpf.length !== 14 && cpf.isValid(this.cpf.replace(/\D/g, ""))) {
        this.msg = "CPF inválido!";
        this.invalid = true;
        return;
      }
			if (!this.isValidPasswd()) {
	      this.invalid = true;
				return;
			}
			this.invalid = false;
      axios
        .get(
          process.env.VUE_APP_MOCK_API_IP +
            "/vivo_clients?cpf=" +
            this.cpf.replace(/\D/g, "")
        )
        .then((response) => {
          if (response.data.length > 0) {
            axios
              .get(
                process.env.VUE_APP_API_IP +
                  "/usersByCpf/" +
                  this.cpf.replace(/\D/g, "")
              )
              .then(() => {
                this.msg = "Usuário já existente";
                this.invalid = true;
              })
              .catch(() => {
                axios
                  .post(process.env.VUE_APP_API_IP + "/users/", {
                    username: this.name.toLowerCase(),
                    cpf: this.cpf.replace(/\D/g, ""),
										passwd: this.passwd,
                  })
                  .then((response) => {
                    this.$cookies.set("id", response.data._id, '4h');
                    router.push({
                      name: "Cliente",
                      params: { id: response.data._id },
                    });
                  })
                  .catch(() => {
                    this.invalid = true;
                  });
              });
          } else {
            this.validVivo = true;
            this.msg = "Você não é cliente vivo";
          }
        });
    },
    closeModal() {
      this.validVivo = false;
    },
    login() {
      router.push({ name: "Login" });
    },
		isValidPasswd() {
			if (this.passwd.length < 3 || this.passwd.length > 32)
			{
				this.msg = "Sua senha não está de acordo com a nossa política de palavras-chave";
				return (false);
			}
			return (true);
		}
  },
};
</script>

<style scoped>
#page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal {
  font-size: 24px;
  line-height: 23.89333px;
  font-weight: 300;
}

@media screen and (max-width: 480px) {
  #page {
    height: 80vh;
    scroll-margin-block: 0;
    position: fixed;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}
</style>