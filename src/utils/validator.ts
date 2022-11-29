export default function valiateFormInput(element: HTMLInputElement): boolean {
  const group = element.parentElement;
  if (!group) return false;
  const value = element.value.trim();
  const requireIsValid = element.required ? !!value : true;
  group.setAttribute("data-error", requireIsValid ? "" : "Поле необходимо для заполенения");

  if (!requireIsValid) return false;

  switch (element.type) {
    case "email": {
      /*
        латиница, 
        может включать цифры и спецсимволы вроде дефиса,
        обязательно должна быть «собака» (@) и точка после неё,
        но перед точкой обязательно должны быть буквы
      */
      const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const emailIsValid = emailRegExp.test(value);
      group.setAttribute("data-error", emailIsValid ? "" : "email некоректен");
      return emailIsValid;
    }
    case "text": {
      if (element.name === "login") {
        /*
         - от 3 до 20 символов,
         - латиница,
         - может содержать цифры, но не состоять из них,
         - без пробелов,
         - без спецсимволов (допустимы дефис и нижнее подчёркивание
        */
        const loginRegExp = /(?!^\d+$)^[a-zA-Z0-9$_-]{3,20}$/;
        const loginIsValid = loginRegExp.test(value);
        group.setAttribute(
          "data-error",
          loginIsValid ? "" : "Допустимы символы латинского, кирилического алфавита, без цифр, первая буква заглавная"
        );
        return loginIsValid;
      } else if (element.name === "first_name" || element.name === "second_name") {
        /*
         first_name, second_name — 
         латиница или кириллица, 
         первая буква должна быть заглавной, 
         без пробелов и без цифр, 
         нет спецсимволов (допустим только дефис)
        */
        const nameRegExp = /^[A-ZА-Я][a-zа-я]{0,256}$/;
        const nameIsValid = nameRegExp.test(value);
        group.setAttribute(
          "data-error",
          nameIsValid ? "" : "Допустимы символы латинского, кирилического алфавита, без цифр, первая буква заглавная"
        );
        return nameIsValid;
      }

      const textRegExp = /^[a-zA-Zа-яА-Я.$_]{3,256}$/;
      const textIsValid = textRegExp.test(value);
      group.setAttribute("data-error", textIsValid ? "" : "Допустимы символы латинского, кирилического алфавита");
      return textIsValid;
    }
    case "tel": {
      /* 
        от 10 до 15 символов,
        состоит из цифр,
        может начинается с плюса.
      */
      const phoneRegExp = /^(\+\d|8)[ ()\d-]{10,16}$/;
      const phoneStrIsValid = phoneRegExp.test(value);
      const phoneNumberlength = value && value.match(/\d/g)?.length;
      group.setAttribute(
        "data-error",
        phoneStrIsValid && phoneNumberlength === 11 ? "" : "Номер телефона должен содержать 11 цифр, допустимы +()-"
      );

      return phoneStrIsValid && phoneNumberlength === 11;
    }
    case "password": {
      // от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
      const passRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/i;
      const passIsValid = passRegExp.test(value);
      group.setAttribute(
        "data-error",
        passIsValid ? "" : "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра"
      );

      if (!passIsValid) return false;

      if (element.name === "password2") {
        const form = element.closest(".form");
        if (!form) return false;
        const pass1 = form.querySelector("[name='password']") as HTMLInputElement;
        if (!pass1) return false;

        const passIsEqual = value === pass1.value;
        group.setAttribute("data-error", passIsEqual ? "" : "Пароли не совпадают");
        return passIsEqual;
      }
      break;
    }
    default:
  }
  return true;
}
