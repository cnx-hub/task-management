import { Input, Select } from 'antd'

// import {useEffect, useState} from 'react';
export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
}

interface SearchPanelProps {
  users: User[]
  param: {
    name: string
    personId: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <form>
      <div>
        {/* === setParam(Object.assign({, param, {name: evt.target.value}}) */}
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value={''}>负责人</Select.Option>
          {/* {console.log(users)} */}
          {/* 没有读到users的内容 */}
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  )
}
