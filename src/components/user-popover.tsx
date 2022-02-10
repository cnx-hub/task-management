import styled from 'styled-components'
import { Typography, List, Divider, Popover } from 'antd'
import { useUsers } from 'utils/user'

export const UserPopover = () => {
  const { data: users, refetch } = useUsers()

  const content = (
    <ContentContainer>
      <Typography.Text type={'secondary'}>组员列表</Typography.Text>
      <List
        dataSource={users}
        renderItem={(user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        )}
      />
      <Divider />
    </ContentContainer>
  )

  return (
    <Popover
      content={content}
      placement={'bottom'}
      onVisibleChange={() => refetch()}
    >
      <span>组员</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
