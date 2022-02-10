import styled from 'styled-components'
import { Dropdown, Button, Menu } from 'antd'

// 头部模块
import { Row, ButtonNoPadding } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { resetRoute } from 'utils'
import { UserPopover } from 'components/user-popover'
import { useAuth } from 'context/auth-context'
import { ProjectPopover } from 'components/project-popover'

import { ProjectListScreen } from 'screens/project-list'

export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo
            width={'18rem'}
            color={'rgb(38, 132, 255)'}
          ></SoftwareLogo>
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { user, logout } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button onClick={logout} type={'link'}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  )
}

const HeaderItem = styled.h3`
  margin-right: 3rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr; // 6rem;
  /* grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer'; */
  height: 100vh;
  /* grid-gap: 10rem; */
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
  /* display: flex;
  align-items: center; */
`
const HeaderRight = styled.div``
const Main = styled.main`
  /* display: flex; */
  overflow: hidden;
  /* grid-area: main; */
  /* height: calc(100vh - 6rem); */
`
