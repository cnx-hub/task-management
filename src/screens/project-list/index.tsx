import React from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils'
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 2000)
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users || []} dataSource={list || []} />
    </div>
  )
}

// 阻止在已卸载组件上赋值
ProjectListScreen.whyDidYouRender = false
