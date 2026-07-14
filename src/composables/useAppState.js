import { ref } from "vue";

const useAppState = () => {
  const tokenState = ref({
    token: null,
    expiresAt: 0,
  });

  console.log(tokenState.value.token);

  return {
    tokenState,
  };
};

export default useAppState;
