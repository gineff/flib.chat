import validator from "utils/validator";
import { navigate } from "utils/router";

export const submitForm = (event: { target: HTMLButtonElement }) => {
  const { target } = event;
  const form = target.closest(".form");
  if (!form) return;
  const controls = form.querySelectorAll(".form__control") as unknown as HTMLInputElement[];
  let result = false;
  const data: { [x: string]: string }[] = [];
  controls.forEach((el) => {
    const { name, value } = el;
    data.push({ [name]: value });
    result = validator(el) || false;
  });

  if (result) {
    console.log("FORM DATA: ", data);
    const conformation = confirm("Данные формы в консоли, переходим в чат?");

    if (conformation) {
      const { target } = event;
      const href = target.getAttribute("href");
      if (href) {
        navigate(href)
      }
    }
  }
};
