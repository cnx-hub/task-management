import styled from 'styled-components'
import { Typography, List, Divider, Popover } from 'antd'

import { useProjectModal } from 'screens/project-list/util'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'

export const ProjectPopover = () => {
  const { open } = useProjectModal()
  const { data: projects, refetch } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List
        dataSource={pinnedProjects}
        renderItem={(project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        )}
      />
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        新建项目
      </ButtonNoPadding>
    </ContentContainer>
  )

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
