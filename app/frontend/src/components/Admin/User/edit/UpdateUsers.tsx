import { getUsers } from "@/Service/Requests/userRequests"
import axios from "axios"
import React, { useEffect, useMemo, useState } from "react"
import { PenSquare } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"
import EditUser from "./EditUser";


export type TUser = {
  id: number,
  firstName: string,
  lastName: string,
  credentialName: string,
  stores: number[]
  active: boolean
}

type TIsEditUser = {
  id: number
  edit: boolean
}

export default function UpdateUsers() {
  const [fetchUsersData, setFetchUsersData] = useState<TUser[]>([])
  const [searchedUsers, setSearchedUsers] = useState<TUser[]>([])
  const [nameFiltered, setNameFiltered] = useState('')
  const [isEditUser, setIsEditUser] = useState<TIsEditUser>({
    id: 0,
    edit: false
  })
  const [sortRadio, setSortRadio] = useState<'asc' | 'desc'>('asc')
  const [isActive, setIsActive] = useState(true)
  const [selectedCredential, setSelectedCredential] = useState<string>('')

  const stores = [
    { id: 1, name: " loja 1" },
    { id: 2, name: " loja 2" },
    { id: 3, name: " loja 3" },
    { id: 4, name: " loja 4" },
  ]

  const credentials = [
    { id: 1, credentialName: 'Root' },
    { id: 2, credentialName: 'Admin' },
    { id: 3, credentialName: 'Estoquista' },
    { id: 4, credentialName: 'Lojista'},
  ]

  const sortUsers = (users: TUser[]) => {
    const sortedUsers = [...users].sort((a, b) => {
      const comparison = a.firstName.localeCompare(b.firstName);
      return sortRadio === 'asc' ? comparison : -comparison;
    });

    return sortedUsers
  }

  const credentialUsers = (cred:TUser[]) => {
    switch (selectedCredential) {
      case 'Root':
        return cred.filter(({credentialName}) => credentialName === 'Root')
      case 'Admin':
        return cred.filter(({credentialName}) => credentialName === 'Admin')
      case 'Estoquista':
        return cred.filter(({credentialName}) => credentialName === 'Estoquista')
      case 'Lojista':
        return cred.filter(({credentialName}) => credentialName === 'Lojista')
      default:
        return cred
    }

  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers()
        setFetchUsersData(sortUsers(users))
        setSearchedUsers(sortUsers(users))
      } catch(err) {
        if(axios.isAxiosError(err)) {
          const errorMessage = err.response?.data.message
          console.log(errorMessage)
        }
      }
    }
    fetchUsers()
  },[])

  useEffect(() => {
    setSearchedUsers(prev => sortUsers(prev))
  },[sortRadio])

 

  function handleStoreNames(storeIds: number[]) {
    const storeNames: string[] = []
    stores.forEach(store => {
      if(storeIds.includes(store.id)) {
        storeNames.push(store.name)
      }
    })
    return storeNames.join(', ')
  }

  const apiResultsFiltered = useMemo(() => {
    setSearchedUsers(fetchUsersData)
    if(nameFiltered.length === 0 && isActive) {
      return credentialUsers(sortUsers(fetchUsersData))
    } else {
      const LowerSearch = nameFiltered.toLowerCase();
      const filterUsers = searchedUsers?.filter(({ firstName, active }) => isActive === active 
          && firstName.toLowerCase().includes(LowerSearch)) 
      return credentialUsers(sortUsers(filterUsers))
      }
  }, [fetchUsersData, nameFiltered, searchedUsers, isActive, selectedCredential ]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortRadio(event.target.value as 'asc' | 'desc');
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCred = event.target.value
    setSelectedCredential(selectedCred);
  };


  return (
      <div className='bg-slate-900 border-yellowDetails rounded border-2 px-52 py-12 mx-52'>
        <section className="flex justify-center px-10 pb-1 mb-2">
          <div className="transition duration-1000 mr-1 px-2 bg-yellowDetails rounded-l-xl hover:bg-blueDetails text-darkBlueDetails accent-yellowDetails hover:accent-blueDetails">
            <input className="cursor-pointer" id="active" type="checkbox" checked={isActive} onChange={() => setIsActive(prev => !prev)}/>
            <label
              className="cursor-pointer "
              htmlFor="active"
            > Ativo</label>
          </div>
          <div className="transition duration-1000 mr-1 px-2 bg-yellowDetails hover:bg-blueDetails text-darkBlueDetails accent-yellowDetails hover:accent-blueDetails">
            <select
              className="transition duration-1000 cursor-pointer text-darkBlueDetails focus:outline-none hover:bg-blueDetails bg-yellowDetails"
              id="credentialSelect"
              onChange={handleSelectChange}
              value={selectedCredential}
            >
              <option value="All">Selecione uma credencial</option>
              { credentials.map(credential => (
                <option key={credential.id.toString()} id={credential.id.toString()} value={credential.credentialName}>{credential.credentialName}</option>
              ) )}

            </select>
          </div>
          <div
            className="transition duration-1000 mr-1 px-2 bg-yellowDetails hover:bg-blueDetails rounded-r-xl text-darkBlueDetails accent-darkBlueDetails"
          >
            <input
              className="cursor-pointer "
              type="radio"
              id="sort-input-asc"
              name="sort-input"
              value="asc"
              onChange={ handleRadioChange } 
              checked={sortRadio === 'asc'}
            />
            <label className="cursor-pointer p-1" htmlFor="sort-input-asc">ASC </label>
            <input
              className="cursor-pointer"
              type="radio"
              id="sort-input-desc"
              name="sort-input"
              value="desc"
              onChange={ handleRadioChange } 
              checked={sortRadio === 'desc'}
            />
            <label className="cursor-pointer p-1" htmlFor="sort-input-desc">DESC</label>
          </div>
        </section>
        <section className="flex justify-center w-full mb-10">
          <input 
            className="cursor-pointer w-2/3 rounded-l-xl pl-4 text-darkBlueDetails focus:border-2 focus:border-yellowDetails focus:outline-none"
            type="text"
            placeholder="Pesquise pelo nome" 
            value={nameFiltered}
            onChange={({ target }) => {
              setNameFiltered(target.value)
              setSearchedUsers(fetchUsersData.filter(user => user.firstName.toLowerCase().includes(nameFiltered.toLowerCase())))
              fetchUsersData
            }}
          />
          <Button
            type="button"
            className="bg-yellowDetails text-darkBlueDetails hover:text-white hover:bg-blueDetails rounded-r-xl"
            variant="icon"
            onClick={() => setSearchedUsers(fetchUsersData.filter(user => user.firstName.toLowerCase().includes(nameFiltered.toLowerCase())))}
          >
            <Search/>
          </Button>
        </section>
 
      <table className="table-auto w-full">
        <thead >
          <tr className="w-full text-lg bg-yellowDetails h-16 text-darkBlueDetails border-4 border-slate-800">
            <th> </th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Função</th>
            <th>Lojas</th>
            <th>Ativo</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          { apiResultsFiltered.map((user, index) => (
            <React.Fragment
            
              key={ index.toString() + '-' + user.firstName }
            >
              <tr
                className={isEditUser.edit && isEditUser.id === user.id ?
                  "relative transition duration-300 bg-slate-900 text-yellowDetails h-12 border-4 border-slate-800"
                  : "relative transition duration-300 text-white/80 hover:text-white bg-slate-950 h-12 border-4 border-slate-800 hover:bg-slate-800"
                }
              >
                <td className="text-yellowDetails pl-3">{index+1}</td>
                <td className="pl-4">{user.firstName}</td>
                <td className="pl-4">{user.lastName}</td>
                <td className="pl-4">{user.credentialName}</td>
                <td className="pl-4">
                  <div className="w-auto">
                    {user.credentialName === 'Lojista' && (<span className="mx-2">{handleStoreNames(user.stores)}</span>)}
                  </div>
                </td>
                <td className={user.active ? "ms-2 text-emerald-500 pl-4" : "ms-2 text-red-500 pl-4"}>
                    {user.active ? 'Sim' : 'Não'}
                </td>
                <td className="flex justify-center items-center h-12">
                  <Button 
                    variant="icon"
                    size="icon"
                    onClick={() => setIsEditUser(prev => prev.id === user.id 
                      ? ({ id: user.id, edit: !prev.edit })
                      : ({ id: user.id, edit: true }))}
                  >
                    <PenSquare />
                    {/* <Link to={`/painel-administrativo/edit-user/${user.id.toString()}`}><PenSquare /></Link> */}
                  </Button>
                </td>
              </tr>
              {isEditUser.edit && isEditUser.id === user.id && (
                <tr className="z-[1]">
                  <td  colSpan={7} className="w-full bg-slate-900 border-4">
                    <EditUser id={+user.id} credentialName={user.credentialName} active={user.active} stores={user.stores}/>
                  </td>
                </tr>
                // aqui da um warning por causa da div, preciso verificar o que pode resolver 
              )}
            </React.Fragment>
          ))
          }
        </tbody>
      </table>
      <span>{JSON.stringify(fetchUsersData)}</span>
    </div>
  )
}