import { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import { Row } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { TaskTypeSelect } from 'components/task-type-select'

// 逻辑实现
import { useTasksSearchParams } from 'screens/kanban/util'
import { useSetUrlSearchParam } from 'utils/url'
import { useDebounce } from 'utils'

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [param, setParam] = useState({ name: '' })

  const debouncedParam = useDebounce(param) // 节流
  useEffect(() => {
    setSearchParams(param)
  }, [debouncedParam])

  const reset = () => {
    setSearchParams({
      name: undefined,
      processorId: undefined,
      tagId: undefined,
      typeId: undefined
    })
  }

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: '20rem' }}
        placeholder={'任务名'}
        onChange={(e) => setParam({ name: e.target.value })}
      />
      <UserSelect
        defaultOptionName={'经办人'}
        value={searchParams?.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={'类型'}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
