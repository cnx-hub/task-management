import { useQuery } from 'react-query'
import { Project } from 'types/project'
import { useHttp } from 'utils/http'
import { cleanObject } from 'utils/index'
export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()

  // 当params发生变化时 useQuery重新执行一次
  return useQuery<Project[]>(['project', cleanObject(params)], () =>
    client('project', { data: params })
  )
}
