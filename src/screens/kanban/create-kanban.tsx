import React, { useState } from 'react'
import { Container } from 'screens/kanban/kanban-column'
import { Input } from 'antd'
import { useKanbansQueryKey, useProjectIdInUrl } from 'screens/kanban/util'
import { useAddKanban } from 'utils/kanban'

export function CreateKanban() {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()

  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }
  return (
    <Container key={projectId}>
      <Input
        size={'large'}
        placeholder={'新建看板名称'}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
      />
    </Container>
  )
}
