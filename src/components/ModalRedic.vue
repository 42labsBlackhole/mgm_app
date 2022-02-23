<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header>
        <slot name="header">
          <p>Texto Header</p>
        </slot>
      </header>
      <main>
        <slot name="body">
          <p>Texto Body</p>
        </slot>
      </main>
      <footer>
        <button  tabindex="7" role="button" type="button" class="button" @click="close">
          <slot name="buttom">
            <h4>Fechar</h4>
          </slot>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "ModalRedic",
  methods: {
    close() {
      this.$emit("close");
    },
    register() {
      router.push({ name: "Register" });
    },
  },
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  width: 50%;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal header {
  height: 15%;
  display: flex;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  padding: 15px;
}

.modal main {
  height: 70%;
  padding: 15px;
}

.modal footer {
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding: 15px;
}

button {
  width: 100px;
}

p {
  font-size: 24px;
  line-height: 23.89333px;
  font-weight: 300; 
}

@media screen and (max-width: 480px) {
	.modal {
		width: 90%;
	}
}
</style>