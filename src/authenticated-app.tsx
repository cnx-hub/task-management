import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import styled from 'styled-components'
import { Row } from './components/lib'
export default function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <HeaderItem>LOGO</HeaderItem>
          <HeaderItem>项目</HeaderItem>
          <HeaderItem>用户</HeaderItem>
          <HeaderItem as={'div'}>another</HeaderItem>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const HeaderItem = styled.h3`
  margin-right: 3rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  height: 100vh;
  /* grid-gap: 10rem; */
`
const Header = styled(Row)`
  /* grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center; */
  justify-content: space-between;
  /* background-color: gray; */
  /* height: 6rem; */
`
const HeaderLeft = styled(Row)`
  /* display: flex;
  align-items: center; */
`
const HeaderRight = styled.div``
const Main = styled.main`
  grid-area: main;
  /* height: calc(100vh - 6rem); */
`

const Nav = styled.nav`
  grid-area: nav;
`

const Aside = styled.aside`
  grid-area: aside;
`

const Footer = styled.footer`
  grid-area: footer;
`
