import validator from "utils/validator";

export const submitForm = (event: { target: HTMLButtonElement }) => {
  const { target } = event;
  const form = target.closest(".form");

  if (!form) return false;

  const controls = form.querySelectorAll(".form__control") as unknown as HTMLInputElement[];
  let correct = true;
  const data: Formdata = [];

  controls.forEach((el) => {
    const { name, value } = el;
    data.push({ [name]: value });
    const result = validator(el);
    if (correct) correct = result;
  });

  return correct && data;
};
