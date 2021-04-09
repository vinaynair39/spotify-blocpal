import React from 'react'
import {Draggable} from 'react-beautiful-dnd';

const  ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.name}
        </div>
      )}
    </Draggable>
  );
}

export default ListItem;