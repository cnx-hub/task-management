import { useQuery, QueryKey, useMutation } from 'react-query'
import { useHttp } from 'utils/http'
import { Task } from 'types/task'
import { useDebounce } from 'utils'

import { SortProps } from 'utils/kanban'
import {
  useReorderTaskConfig,
  useEditConfig,
  useDeleteConfig
} from 'utils/use-optimistic-options'
import { Project } from 'types/project'
// 获取某一看板全部的任务
export const useTasks = (param: Partial<Task>) => {
  const client = useHttp()
  const debouncedParam = { ...param, name: useDebounce(param?.name) }

  return useQuery<Task[]>(['tasks', debouncedParam], () =>
    client('tasks', { data: debouncedParam })
  )
}
// 获取某一看板的具体任务
export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id)
  })
}
// 重新排列任务
export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST'
    })
  }, useReorderTaskConfig(queryKey))
}
// 编辑任务
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Task>) => {
    return client(`tasks/${params.id}`, {
      method: 'PATCH',
      data: params
    })
  }, useEditConfig(queryKey))
}
// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(({ id }: { id: number }) => {
    return client(`tasks/${id}`, {
      method: 'DELETE'
    })
  }, useDeleteConfig(queryKey))
}
