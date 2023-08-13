import { atom } from "recoil";

export const loginState = atom({
  // Clave única para identificar este átomo
  key: "loginState",
  default: {
    isLoading: false, // Indica si el formulario está cargando
    isFormInvalid: true, // Indica si el formulario es inválido
    username: "", // Almacena el valor del campo de nombre de usuario
    password: "", // Almacena el valor del campo de contraseña
    usernameError: "", // Almacena el error del campo de nombre de usuario
    passwordError: "", // Almacena el error del campo de contraseña
    mainError: "", // Almacena el error principal del formulario
  },
});
