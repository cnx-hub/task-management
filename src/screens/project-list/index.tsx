import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from 'styled-components'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { ErrorBox, Row } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  // const [users, setUsers] = useState([])
  const [param, setParam] = useProjectsSearchParams()

  const debouncedParam = useDebounce(param, 2000)
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  // const [list, setList] = useState([])

  // 使用useProjects获取异步操作的状态
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUsers()

  // useEffect(() => {
  //   run(client('projects', { data: cleanObject(debouncedParam) }))
  // setIsLoading(true)
  // client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  //   .catch(error => {
  //     setList([])
  //     setError(error)
  //   })
  //   .finally(() => setIsLoading(false))
  // fetch(
  //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
  // ).then(async (response) => {
  //   if (response.ok) {
  //     setList(await response.json())
  //   }
  // })
  // }, [debouncedParam])

  // useMount(() => {
  //   client('users').then(setUsers)
  // fetch(`${apiUrl}/users`).then(async (response) => {
  //   if (response.ok) {
  //     setUsers(await response.json())
  //   }
  // })
  // })

  return (
    <ScreenContainer>
      <Row marginBottom={2} between={true}>
        <h1>项目列表</h1>
        {/* <ButtonNoPadding onClick={open} type={"link"}>
            创建项目
          </ButtonNoPadding> */}
      </Row>
      <SearchPanel
        users={users || []}
        param={param || {}}
        setParam={setParam}
      />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  )
}

// 阻止在已卸载组件上赋值
ProjectListScreen.whyDidYouRender = false

const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`
