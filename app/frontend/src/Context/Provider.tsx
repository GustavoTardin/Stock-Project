import Context from './Context';

function Provider({ children }:{ children: React.ReactNode }) {
  return (
    <Context.Provider value="b">
      {children}
    </Context.Provider>
  );
}

export default Provider;
