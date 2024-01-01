import { Loading } from "../Loading"

type DataFetchSuccess = {
  status: 'success'
  text: string
}

type DataFetchError = {
  status: 'error'
  error: { message: string }
}

type DataFetchLoading = {
  status: 'loading'
}

export type DataFetch = DataFetchSuccess | DataFetchError | DataFetchLoading

export function PrintData(data: DataFetch) {
  return (
    <>
      {data.status === 'loading' && <Loading/>}
      {data.status === 'success' && (
        <div className="absolute z-[1] transition bg-emerald-500 flex justify-center items-center rounded-b-lg w-full h-10 duration-500">
          {
            <pre className="text-white text-lg">{`${data.text} sucesso`}</pre>
          }
        </div>)
      }
      {data.status === 'error' && (
        <div className="absolute z-[1] transition bg-red-500 flex justify-center items-center rounded-b-lg w-full h-10 duration-500">
          {
            <pre className="text-white">{data.error.message}</pre>
          }
        </div>)
      }
    </>
  )
}