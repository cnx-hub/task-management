import { useQuery } from 'react-query'
import { Project } from 'types/project'
import { useHttp } from 'utils/http'
import { cleanObject } from 'utils/index'
export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp()

  // 当params发生变化时 useQuery重新执行一次
  return useQuery<Project[]>(['project', cleanObject(params)], () =>
    client('projects', { data: params })
  )
}

// 获取kanban中的后台数据
export const useProject = (id?: number) => {
  const client = useHttp()

  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}
