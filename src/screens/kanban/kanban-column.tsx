import React, { forwardRef } from 'react'
import styled from 'styled-components'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'

import type { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import {
  useTasksSearchParams,
  useKanbansQueryKey,
  useTasksModal
} from 'screens/kanban/util'
import { useDeleteKanban } from 'utils/kanban'

import { Row } from 'components/lib'
import { Dropdown, Modal, Menu, Button, Card } from 'antd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { Task } from 'types/task'
import { Mark } from 'components/mark'
import { useTaskTypes } from 'utils/task-type'
import { TaskModal } from 'screens/kanban/task-modal'
import { CreateTask } from 'screens/kanban/create-task'

export const KanbanColumn = forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }, ref) => {
    const { data: allTasks } = useTasks(useTasksSearchParams())
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

    return (
      <Container {...props} ref={ref}>
        <Row between={true}>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} />
        </Row>
        <TasksContainer>
          <Drop
            type={'ROW'}
            direction={'vertical'}
            droppableId={String(kanban.id)}
          >
            <DropChild style={{ minHeight: '1rem' }}>
              {tasks?.map((task, taskIndex) => (
                <Drag
                  key={task.id}
                  index={taskIndex}
                  draggableId={'task' + task.id}
                >
                  <div>
                    <TaskCard task={task} key={task.id} />
                  </div>
                </Drag>
              ))}
            </DropChild>
          </Drop>
          <CreateTask kanbanId={kanban.id} />
        </TasksContainer>
        <TaskModal />
      </Container>
    )
  }
)

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name}></Mark>
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) {
    return null
  }
  return (
    <img
      src={name === 'task' ? taskIcon : bugIcon}
      alt="task-icon"
      style={{ width: '2rem' }}
    />
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        return mutateAsync({ id: kanban.id })
      }
    })
  }

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={'link'} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={overlay}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}

const TasksContainer = styled.div`
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`
