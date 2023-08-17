import Context from './Context';

function Provider({ children }:{ children: React.ReactNode }) {
  return (
    <Context.Provider value="a">
      {children}
    </Context.Provider>
  );
}

export default Provider;
