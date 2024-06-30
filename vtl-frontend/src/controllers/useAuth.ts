import { loginWithEmail, registerWithEmail, updateInfo, changePass } from "@/services/auth";

const useAuth = () => {
  const login = async (body: any) => {
    return await loginWithEmail(body);
  };
  const register = async (body: any) => {
    return await registerWithEmail(body);
  };

  const update = async (body: any) => {
    return await updateInfo(body);
  };

  const changePassword = async (body: any) => {
    return await changePass(body);
  }

  return { login, register, update, changePassword };
};

export default useAuth;
