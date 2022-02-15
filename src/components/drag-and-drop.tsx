import React, { ReactNode } from 'react'
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  Draggable,
  DraggableProps
} from 'react-beautiful-dnd'

// 拖拽的列表   children属性重新封装为ReactNode
type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop = ({ children, type, direction, droppableId }: DropProps) => {
  return (
    <Droppable type={type} direction={direction} droppableId={droppableId}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div />
      }}
    </Droppable>
  )
}
// 接受拖拽列表的ref
type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
)

// 拖拽的元素
type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
