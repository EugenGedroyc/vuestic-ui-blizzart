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

const { confirm } = useModal()

const foo = async () => {
  const { result } = await confirm('lol')

  if (result) {
    alert(result)
  } else {
    alert('canceled')
  }
}
foo()

// setTimeout(() => {
//   close()
// }, 5000);

// const alert = (...args) => window.alert(...args)

// const { confirm } = useModal();

// const { close } = init("123");

// setInterval(() => {
//   close();
// }, 5000);
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
