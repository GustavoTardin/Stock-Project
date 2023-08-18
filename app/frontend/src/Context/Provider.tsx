import Context from './Context';

function Provider({ children }:{ children: React.ReactNode }) {
  return (
    <Context.Provider value="b">
      {children}
    </Context.Provider>
  );
}

export default Provider;

/* Coisas que com certeza serão úteis colocar no contexto global:
        - Dados do usuário

*/
