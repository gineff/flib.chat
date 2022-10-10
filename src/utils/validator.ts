const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const loginRegExp = /^[a-zA-Z0-9.$_]{4,256}$/;
const textRegExp = /^[a-zA-Zа-яА-Я.$_]{4,256}$/;
const phoneRegExp = /^(\+\d|8)[ ()\d-]{10,16}$/;

export default function valiateFormInput(element: HTMLInputElement): boolean {
  const group  = element.parentElement;
  const value = element.value.trim();
  const requireIsValid = element.required ? !!value : true;

  group!.classList[requireIsValid ? "remove" : "add"]("form__group_invalid-require");
  if (!requireIsValid) return false;

  switch (element.type) {
    case "email": {
      const emailIsValid = emailRegExp.test(value);

      group.classList[emailIsValid ? "remove" : "add"]("form__group_invalid-email");
      return emailIsValid;
    }
    case "text": {
      if (element.name === "login") {
        const loginIsValid = loginRegExp.test(value);

        group!.classList[loginIsValid ? "remove" : "add"]("form__group_invalid-login");
        return loginIsValid;
      }

      const textIsValid = textRegExp.test(value);

      group!.classList[!requireIsValid || textIsValid ? "remove" : "add"]("form__group_invalid-text");
      return textIsValid;
    }
    case "tel": {
      const phoneStrIsValid = phoneRegExp.test(value);
      const phoneNumberlength = value && value.match(/\d/g)?.length;

      group!.classList[phoneStrIsValid && phoneNumberlength === 11 ? "remove" : "add"]("form__group_invalid-phone");
      return phoneStrIsValid && phoneNumberlength === 11;
    }
    case "password": {
      if (element.name === "password2") {
        const form: HTMLElement = element.closest(".form")!;
        const pass1: HTMLInputElement = form.querySelector("[name='password']")!;

        const passIsValid = value === pass1.value;

        group!.classList[!requireIsValid || passIsValid ? "remove" : "add"]("form__group_invalid-password");
        return passIsValid;
      }
      break;
    }
    default:
  }
  return true;
}
