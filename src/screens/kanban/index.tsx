import React from 'react'
import { useDocumentTitle } from 'utils'

import { Profiler } from 'components/profiler'
import { ScreenContainer } from 'components/lib'
import { SearchPanel } from 'screens/kanban/search-panel'

import { useProjectInUrl } from 'screens/kanban/util'

export function KanbanScreen() {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()

  return (
    <Profiler id={'看板页面'}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
      </ScreenContainer>
    </Profiler>
  )
}
