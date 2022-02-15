import { QueryKey, useQueryClient } from 'react-query'
import { reorder } from 'utils/reorder'
import { Task } from 'types/task'

// 更新react-query缓存的数据
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient()

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return { previousItems }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}
// 配置 拖拽列表变化的的后台参数
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))

// 配置 拖拽任务栏变化的后台参数
export const useReorderTaskConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[]
    return orderedList.map((item) =>
      item?.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    )
  })
}
// 删除的react-query配置
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  )

// 修改的react-query配置
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  )

// 添加的react-query配置
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []))
