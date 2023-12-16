

 type TNewUser = {
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  credentialId: number | string;
  stores?: number[] | string[]; // adicionei "ou" devido a atualizaçoes do frontend, ***Tardin disse que era para enviar array de numbers
};

export default TNewUser