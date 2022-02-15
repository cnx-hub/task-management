import React, { useState } from 'react'
import styled from 'styled-components'
import { Route, Routes, useLocation } from 'react-router'
// 侧边栏部分
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
// 主体部分
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

//获取当前地址的最后一个值  /kanban  /epic
const useRouteType = () => {
  const utils = useLocation().pathname.split('/')
  // 将默认地址变为kanban
  // if (
  //   utils[utils.length - 1] !== 'kanban' ||
  //   utils[utils.length - 1] !== 'epic'
  // )
  //   return 'kanban'
  if (!['kanban', 'epic'].includes(utils[utils.length - 1])) {
    return 'kanban'
  }
  return utils[utils.length - 1]
}

export function ProjectScreen() {
  const routeType = useRouteType()
  // const [curMenu, setCurMenu] = useState('kanban')
  // const selectMenu = (evt: MenuInfoProps) => {
  //   // setCurMenu()
  //   console.log(evt.activeKey);

  // }
  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>
          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'kanban'} element={<KanbanScreen />} />
          <Route path={'epic'} element={<EpicScreen />} />
          <Route index element={<KanbanScreen />} />
        </Routes>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`
const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`
