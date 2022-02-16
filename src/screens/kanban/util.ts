import { useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useProject } from 'utils/project'
import { useTask } from 'utils/task'
import { useUrlQueryParam } from 'utils/url'

// 获取当前看板路由对应的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

// 获取对应路由Task中参数的值和id
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId, //对应项目的id
      typeId: Number(param.typeId) || undefined, //bug/task
      processorId: Number(param.processorId) || undefined, //负责人
      tagId: Number(param.tagId) || undefined, //
      name: param.name //项目的名称
    }),
    [param, projectId]
  )
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })
// 看板的QueryKey
export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]
// Task的Query
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
// 编辑Task
export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    'editingTaskId'
  ])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id })
    },
    [setEditingTaskId]
  )
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: '' })
  }, [setEditingTaskId])
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
