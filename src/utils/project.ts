import { QueryKey, useMutation, useQuery } from 'react-query'
import { Project } from 'types/project'
import { useHttp } from 'utils/http'
import { cleanObject } from 'utils/index'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig
} from './use-optimistic-options'

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

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}
