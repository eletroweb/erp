<template>
    <q-input
      ref="inputRef"
      v-model="value"
      outlined
      label="Amount"
      :error-message="errorMessage"
      :error="!!errorMessage"
    />
    123123
  </template>
  
  <script>
  import { useCurrencyInput } from "vue-currency-input";
  import { useField } from "vee-validate";
  
  export default {
    name: "QCurrencyInput",
    props: {
      modelValue: Number,
      options: Object,
    },
    setup(props) {
      const { inputRef, numberValue } = useCurrencyInput(props.options);
      const validateMinValue = () => {
        if (numberValue.value < 1000) {
          return "Minimum value is 1000";
        } else {
          return true;
        }
      };
      const { errorMessage, value } = useField("amount", validateMinValue);
  
      return { inputRef, errorMessage, value };
    },
  };
  </script>
  