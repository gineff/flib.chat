import validator from "utils/validator";

export const submitForm = (event: { target: HTMLButtonElement }) => {
  const { target } = event;
  const form = target.closest(".form");

  if (!form) return false;

  const controls = form.querySelectorAll(".form__control") as unknown as HTMLInputElement[];
  let result = false;
  const data: { [x: string]: string }[] = [];

  controls.forEach((el) => {
    const { name, value } = el;
    data.push({ [name]: value });
    result = validator(el) || false;
  });

  return result && data;
};
