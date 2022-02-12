import { useMemo } from 'react'
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])
  // const [{ editingProjectId }, setEditingProject] = useUrlQueryParam([
  //   "editingProject",
  // ]);
  const setUrlParams = useSetUrlSearchParam()
  // todo
  // const { data: editingProject, isLoding } = useProject(
  //   Number(editingProjectId)
  // );

  const open = () => setProjectCreate({ projectCreate: true })

  return {
    open
  }
}

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam
  ] as const
}
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['project', params]
}
