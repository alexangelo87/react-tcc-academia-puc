export const TOKEN_KEY = "@GymToken";
export const ROLE_KEY_ADMIN = "@GymRoleADMIN";
export const ROLE_KEY_ALUNO = "@GymRoleALUNO";
export const ROLE_KEY_RECEPCIONISTA = "@GymRoleRECEPCIONISTA";
export const ROLE_KEY_GERENTE = "@GymRoleGERENTE";
export const USER_NAME = '@UserName';
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdmin = () => localStorage.getItem(ROLE_KEY_ADMIN) === 'ADMIN';
export const isAluno = () => localStorage.getItem(ROLE_KEY_ALUNO) === 'ALUNO';
export const isRecepcionista = () => localStorage.getItem(ROLE_KEY_RECEPCIONISTA) === 'RECEPCIONISTA';
export const isGerente = () => localStorage.getItem(ROLE_KEY_GERENTE) ==='GERENTE';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserName = () => localStorage.getItem(USER_NAME);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY_ADMIN);
  localStorage.removeItem(ROLE_KEY_ALUNO);
  localStorage.removeItem(ROLE_KEY_RECEPCIONISTA);
  localStorage.removeItem(ROLE_KEY_GERENTE);
  localStorage.removeItem(USER_NAME);
};
export const setRole = roles => {
  roles.forEach(role => {
    localStorage.setItem(`@GymRole${role}`, role);
  });
}
export const setUserName = userName => {
  localStorage.setItem(USER_NAME, userName);
}