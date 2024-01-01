import { useEffect, useMemo } from 'react';
import Context from './Context';

function Provider({ children }:{ children: React.ReactNode }) {

  // useEffect(() => {
  //   const handleApiFilter = (arrApiFilter) => {
  //     if (multfilters.length === 0) {
  //       setApiFilter([]);
  //     } else {
  //       multfilters?.forEach((e) => {
  //         let elementColumn = '';
  //         const test = apiFilter?.filter((element) => {
  //           elementColumn = e.columnSelect;
  //           switch (e.comparasionSelect) {
  //           case 'maior que':
  //             return Number(element[e.columnSelect]) > Number(e.valueInput);
  //           case 'menor que':
  //             return Number(element[e.columnSelect]) < Number(e.valueInput);
  //           default:
  //             return Number(element[e.columnSelect]) === Number(e.valueInput);
  //           }
  //         });
  //         const newOptions = columnOptions.filter((element) => element !== elementColumn);
  //         setColumnOptions(newOptions);
  //         setColumnSelect(newOptions[0]);
  //         setApiFilter(test);
  //       });
  //     }
  //   }
  // }, [multfilters])

  const contexto = useMemo(() => ({}),[])
  return (
    <Context.Provider value={contexto}>
      {children}
    </Context.Provider>
  );
}

export default Provider;

/* Coisas que com certeza serão úteis colocar no contexto global:
        - Dados do usuário

*/
