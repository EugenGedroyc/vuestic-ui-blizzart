<template>
  <VbDemo>
    <VaCard>
      <va-button @click="confirm('Hello!')"> Default </va-button>
    </VaCard>
    <VaCard>
      <va-button
        @click="
          confirm({
            message: 'Hello!',
            title: 'Are you sure?',
            okText: 'Confirm',
            cancelText: 'No',
          })
        "
      >
        Object options
      </va-button>
    </VaCard>
    <VaCard>
      <va-button
        @click="
          confirm('Wait for alert after you close it!').then((r) => alert(r))
        "
      >
        Alert promise result
      </va-button>
    </VaCard>
  </VbDemo>
</template>

<script setup>
import { VaButton } from '../va-button'
import { useModal } from './'

// const { confirm, close } = useModal();
// confirm("123");
// const func = async () => {
//   const result = await confirm({
//     message: "123",
//     title: "",
//     okText: "Выйти из сервисного меню",
//     cancelText: "Продолжить работу",
//   });
//   if (result) {
//     console.log("result");
//   } else {
//     console.log("canceled");
//   }
// };
// func();

const { init, close } = useModal()
init('123')

setTimeout(() => {
  close()
}, 5000)
</script>

<style lang="scss">
.example-modal-anchor {
  button {
    color: red;
  }
}

.example-modal {
  .va-modal__container {
    background-color: blue;
  }
}
</style>
