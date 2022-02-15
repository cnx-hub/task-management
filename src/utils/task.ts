import { useQuery, QueryKey, useMutation } from 'react-query'
import { useHttp } from 'utils/http'
import { Task } from 'types/task'
import { useDebounce } from 'utils'

import { SortProps } from 'utils/kanban'
import { useReorderTaskConfig } from 'utils/use-optimistic-options'
import { Project } from 'types/project'

export const useTasks = (param: Partial<Task>) => {
  const client = useHttp()
  const debouncedParam = { ...param, name: useDebounce(param?.name) }

  return useQuery<Task[]>(['tasks', debouncedParam], () =>
    client('tasks', { data: debouncedParam })
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['task', { id }], () => client(`tasks${id}`), {
    enabled: Boolean(id)
  })
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation((params: SortProps) => {
    return client('tasks/reorder', {
      data: params,
      method: 'POST'
    })
  }, useReorderTaskConfig(queryKey))
}
