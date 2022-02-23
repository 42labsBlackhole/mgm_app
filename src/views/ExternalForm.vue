<template>
  <div id="parent">
    <div id="purple-side">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 33"
          class="vivinho-icon"
		  		tabindex="1"
        	role="img"
        >
          <path
            fill="#FFF"
            fill-rule="evenodd"
            d="M12.018 26.724c.68.04.88.408 1.11.69.231.28 3.6 4.393 3.828 4.66.228.27.857.763 1.55.857.691.094 1.45-.049 1.935-.406.485-.357 1.1-.844 1.316-1.168.215-.324.58-.79.514-1.554-.069-.763-.233-1.163-.82-1.818-.585-.654-4.052-4.8-4.704-5.595 0 0-.593-.708-.507-1.708.087-1.002.532-1.449 1.47-1.698.936-.247 4.599-1.15 4.599-1.15s2.096-1.01 1.62-3.01l-.272-1.024s-.457-2.335-3.47-1.612c-3.015.725-4.69 1.152-4.69 1.152s-.96.093-1.097-.552c-.136-.645.042-.979.467-1.158.423-.18 3.1-1.481 3.443-4.998.346-3.518-2.549-6.645-6.302-6.632-3.755.014-6.471 2.895-6.46 5.876.011 2.983 1.912 4.968 3.373 5.708.83.42.564 1.176.564 1.176s-.2.736-1.072.54c-.872-.2-5.1-1.184-5.1-1.184s-2.549-.48-3.164 2.08c-.617 2.564.816 3.537 1.868 3.778 1.052.241 4.609 1.118 4.609 1.118s1.058.531 1.1 1.621c.025.644.026 1.179-.64 2.139-.666.96-4.806 5.87-4.806 5.87s-1.423 1.72.639 3.27c2.062 1.55 3.222 1.188 4.446-.24 1.223-1.427 3.64-4.416 3.64-4.416s.333-.65 1.013-.612z"
          ></path>
        </svg>
        <h2 tabindex="1" role="textbox">Legal! Agora vamos ver se você é elegível</h2>
      </div>
    </div>
    <div id="white-side">
      <form @submit.prevent id="form">
        <input tabindex="2" v-model="name" type="text" placeholder="Nome" />
        <input
          v-model="cpf"
          type="text"
          placeholder="CPF"
					tabindex="2"
          v-maska="'###.###.###-##'"
        />
        <span tabindex="3" v-if="error">{{ msg }}</span>
        <button tabindex="2" @click="newVivoClient()">Contratar</button>
      </form>
    </div>
    <ModalRedic v-if="listener">
      <template v-slot:header>
        <h3 tabindex="3">Este site é uma simulação</h3>
      </template>
      <template v-slot:body>
        <h3 tabindex="3">
          Ao clicar em "Contratar" consideramos que você agora é um cliente Vivo,
           continue para se cadastrar no Re-comm.
        </h3>
      </template>
      <template v-slot:buttom>
        <h4>
          <a tabindex="3" style="color:white" id="link" href="#" @click="register">Continuar</a>
        </h4>
      </template>
    </ModalRedic>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import ModalRedic from "../components/ModalRedic.vue";

export default {
  name: "ExternalForm",
  data() {
    return {
      cpf: "",
      name: "",
      error: false,
      msg: "",
      listener: false,
    };
  },
  components: { ModalRedic },
  methods: {
    newVivoClient() {
      this.error = false;
      if (this.cpf.length !== 14) {
        this.msg = "CPF inválido!";
        this.error = true;
        return;
      }
      if (
        this.name.length < 2 ||
        !/^[a-zA-Z áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚ]+$/.test(this.name)
      ) {
        this.msg = "Nome inválido! Seu nome deve contar apenas letras.";
        this.error = true;
        return;
      }
      axios
        .get(
          process.env.VUE_APP_MOCK_API_IP +
            "/vivo_clients?cpf=" +
            this.cpf.replace(/\D/g, "")
        )
        .then((response) => {
          if (response.data.length === 0) {
            axios.post(
              process.env.VUE_APP_API_IP +
                "/newCustomer/" +
                this.$route.params.code,
              {
                customer: this.name,
                socialMedia: this.$route.params.from,
              }
            );
            axios
              .post(process.env.VUE_APP_MOCK_API_IP + "/vivo_clients", {
                cpf: this.cpf.replace(/\D/g, ""),
                name: this.name,
              })
              .then(() => {
                this.listener = true;
              });
            //   window.location.href =
            //   "https://lojaonline.vivo.com.br/monte-seu-combo/disponibilidade";})
          } else {
            this.msg = "Usuário já existe";
            this.error = true;
          }
        });
    },
    closeModal() {
      this.listener = false;
    },
    register() {
      router.push({ name: "Register" });
    },
  },
};
</script>

<style scoped>
#parent {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
}

#purple-side {
  height: 100%;
  width: 53%;
  padding: 8% 0% 0% 5%;
  justify-content: center;
  align-items: center;
  background-color: #660099;
}

#white-side {
  height: 100%;
  width: 47%;
  padding: 0% 5% 0% 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vivinho-icon {
  width: 26.4px;
  height: 36.3px;
}

h2 {
  color: white;
  margin-top: 25%;
  font-weight: 300;
  font-size: 2.63543vw;
  width: 70%;
}

#form {
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 75%;
}

#form input {
  height: 50px;
  margin-top: 3%;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  padding-left: 10px;
}

#form button {
  opacity: 1;
  height: 50px;
  width: 130px;
  margin-top: 3%;
}

#form button:hover {
  cursor: pointer;
}

#form span {
  margin-top: 2%;
  color: #cd1e5a;
}

@media screen and (max-width: 480px) {
  .vivinho-icon {
    display: none;
  }

  #parent {
    flex-direction: column;
    background-color: rgb(245, 245, 245);
  }

  #white-side {
    margin-top: 7%;
    width: 100%;
    align-items: flex-start;
  }

  #purple-side {
    height: 35vh;
    width: 100%;
  }

  h2 {
    margin-top: 0%;
    font-size: 32px;
  }

  #form button {
    border: 1px solid rgb(228, 228, 228);
    border-radius: 5px;
  }
}

@media screen and (min-width: 481px) {
  h2 {
    line-height: 2.92826vw;
    letter-spacing: -0.07321vw;
  }
}
</style>


