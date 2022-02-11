import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

// 获取当前路由对应的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

// 获取对应路由中参数的值和id
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name
    }),
    [param, projectId]
  )
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())
