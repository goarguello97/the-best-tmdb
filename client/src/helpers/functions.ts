export const resetForm = (values: {}, set: Function) => {
  set(values);
};

export const afterRegister = (
  status: number | {},
  set: Function,
  set2: Function
) => {
  if (status === 201) {
    setTimeout(() => {
      set(true);
      set2(false);
    }, 5000);
  }
};


