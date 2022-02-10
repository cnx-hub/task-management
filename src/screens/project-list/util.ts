import { useUrlQueryParam } from 'utils/url'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    'projectCreate'
  ])

  const open = () => setProjectCreate({ projectCreate: true })

  return {
    open
  }
}
