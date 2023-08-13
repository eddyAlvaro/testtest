import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Authentication } from "../../../domain/usecases";
import { Validation } from "../../protocols";
import { FormStatus, Input, SubmitButton, loginState } from "./components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginHeader, currentAccountState } from "../../components";
import React from "react";
import { MD5 } from "crypto-js";
type Props = {
  validation: Validation;
  authentication: Authentication;
};

// Este componente renderiza el componente de inicio de sesión
const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState);
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
  const [state, setState] = useRecoilState(loginState);
  const navigate = useNavigate();

  // Restablece el estado de inicio de sesión al montar el componente
  useEffect(() => resetLoginState(), []);

  // Valida el campo "username" cuando cambia
  useEffect(() => validate("username"), [state.username]);

  // Valida el campo "password" cuando cambia
  useEffect(() => validate("password"), [state.password]);

  // Función para validar un campo específico
  const validate = (field: string): void => {
    const { username, password } = state;
    const formData = { username, password };

    // Realiza la validación y actualiza los errores en el estado
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }));

    // Actualiza la bandera de formulario inválido si hay errores en username o password
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.usernameError || !!old.passwordError,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      const hash = MD5(state.password).toString();

      // Cambia el estado para indicar carga
      setState((old) => ({ ...old, isLoading: true }));

      // Autenticación con credenciales
      const account = await authentication.auth({
        username: state.username,
        password: hash,
      });

      // Establece la cuenta actual y navega al dashboard
      setCurrentAccount(account);
      navigate("/dashboard");
    } catch (error: any) {
      // Actualiza el estado con un error en caso de fallo
      setState((old) => ({
        ...old,
        isLoading: false,
        mainError: error.message,
      }));
    }
  };

  return (
    <section className="flex w-full h-[100vh] justify-center items-center bg-slate-300">
      <div className="bg-slate-200 p-[20px] rounded-lg max-w-[360px]">
        <LoginHeader />
        <form data-testid="form" onSubmit={handleSubmit}>
          <Input type="email" name="username" placeholder="Ingrese email" />
          <Input
            type="password"
            name="password"
            placeholder="Ingrese contraseña"
          />
          <SubmitButton text="Entrar" />
          <FormStatus />
        </form>
      </div>
    </section>
  );
};

export default Login;
