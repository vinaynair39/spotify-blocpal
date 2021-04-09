import React from 'react';
import {  Droppable } from "react-beautiful-dnd";
import CardList from 'components/CardList';
import './Column.scss'

function Column({ droppableId, items, title }) {
  return (
    <Droppable droppableId={droppableId}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="column">
          <h1 className="title">{title}</h1>
          <CardList items={items} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Column