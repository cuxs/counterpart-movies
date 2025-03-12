import useAxios from "axios-hooks"

type UseMoviesProps = {
  pageIndex: number;
  pageSize: number;
}

export function useMovies<T>(pagination: UseMoviesProps){
  const [{ data, loading, error }, refetch]= useAxios<T>({url: 'http://127.0.0.1:8000/api/movies', params:{
    limit: pagination.pageSize, offset: pagination.pageSize * pagination.pageIndex
  }})
  return {loading, data}
}