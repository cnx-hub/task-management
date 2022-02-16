import React, { useEffect, useState } from 'react'
import { Card, Input } from 'antd'

import { useAddTask } from 'utils/task'
import { useTasksQueryKey, useProjectIdInUrl } from 'screens/kanban/util'

export function CreateTask({ kanbanId }: { kanbanId: number }) {
  const [name, setName] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddTask(useTasksQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId, kanbanId })
    setInputMode(false)
    setName('')
  }

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  const toggle = () => setInputMode((mode) => !mode)
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={'需要做些什么'}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  )
}
