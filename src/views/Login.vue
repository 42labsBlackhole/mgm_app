<template>
  <div id="page">
    <div id="login">
      <img
        tabindex="1"
        role="img"
        alt="Bem-Vindo ao Recomm"
        src="../assets/logo_vivo_recomm.png"
      />
      <div>
        <input
          tabindex="2"
          v-model="cpf"
          role="textbox"
          type="text"
          placeholder="Insira seu CPF"
          v-maska="'###.###.###-##'"
          @keyup.enter="login"
        />
      </div>
	  <div id="passwd">
		  <input
          tabindex="2"
          v-model="passwd"
          role="textbox"
          placeholder="Insira sua senha"
		  type="password"
		  maxlength="32"
		  minlength="3"
          @keyup.enter="login"
		  />
	  </div>
      <span tabindex="4" v-if="found">{{ msg }}</span>
      <button tabindex="3" class="button" @click="login">LOGIN</button>
      <p tabindex="8">
        Ainda não possui conta?
        <a role="link" tabindex="9" id="link" href="#" @click="register">
		  Cadastre-se!
		</a>
      </p>
    </div>
    <ModalRedic v-if="validVivo" @close="closeModal">
      <template v-slot:header>
        <p class="Modal" tabindex="4">
          Parece que você ainda não é um usuário do Re-Comm
        </p>
      </template>
      <template v-slot:body>
        <p
          class="Modal"
          tabindex="5"
          aria-label="Reconhecemos que você é um cliente VIVO mas ainda não está cadastrado
          no Re-Comm. Para se cadastrar"
        >
          Reconhecemos que você é um cliente VIVO mas ainda não está cadastrado
          no Re-Comm. Para se cadastrar
          <a role="link" tabindex="6" id="link" href="#" @click="register"
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

export default {
  name: "Login",
  data() {
    return {
      found: false,
      validVivo: false,
      cpf: "",
      msg: "",
	  	passwd: "",
    };
  },
  components: { ModalRedic },
  beforeCreate() {
    if (this.$cookies.isKey("id")) {
      router.push({ name: "Cliente", params: { id: this.$cookies.get("id") } });
    }
  },
  methods: {
    login() {
      this.found = false;
      this.msg = "Usuário inválido!";
      if (this.cpf.length !== 14) {
        this.msg = "Cpf inválido!";
        this.found = true;
        return;
      }
      axios
        .get(
          process.env.VUE_APP_API_IP +
            "/usersByCpf/" +
            this.cpf.replace(/\D/g, "")
        )
        .then((response) => {
					this.isCorrectPasswd(response.data._id)
						.then(() => {
							this.$cookies.set("id", response.data._id, '4h');
							router.push({ name: "Cliente", params: { id: response.data._id } });
						})
						.catch(() => {
							this.msg = "Senha inválida!";
	        		this.found = true;
						});
        })
        .catch(() => {
          axios
            .get(
              process.env.VUE_APP_MOCK_API_IP +
                "/vivo_clients?cpf=" +
                this.cpf.replace(/\D/g, "")
            )
            .then((response) => {
              if (response.data.length > 0) {
                this.validVivo = true;
              } else {
                this.found = true;
              }
            });
        });
    },
    register() {
      router.push({ name: "Register" });
    },
    closeModal() {
      this.validVivo = false;
    },
		isCorrectPasswd(id) {
			return axios
			.post(process.env.VUE_APP_API_IP + "/oauth/" + id, {
				passwd: this.passwd,
			})
		}
  },
};
</script>

<style scoped>
.Modal {
  font-size: 24px;
  line-height: 23.89333px;
  font-weight: 300;
}

#page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#passwd {
	margin-top: 1%;
}

@media screen and (max-width: 480px) {
  #page {
    height: 75vh;
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
