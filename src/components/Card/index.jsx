import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./Card.scss";

const Card = ({ index, image, name, id, forPlaylist, onClick = () => {} }) => {
  return forPlaylist ? (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="card"
          onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {forPlaylist ? (
            <>
              <img src={image} alt={name} className="image" />
              <p className="card-name">{name}</p>
            </>
          ) : (
            <>
              <img className="image" src={image} alt="" />
              <p className="card-name">{name.substring(0, 30)}</p>
            </>
          )}
        </div>
      )}
    </Draggable>
  ) : (
    <div className="card" onClick={onClick}>
      {forPlaylist ? (
        <>
          <img src={image} alt={name} className="image" />
          <p className="card-name">{name}</p>
        </>
      ) : (
        <>
          <img className="image" src={image} alt="" />
          <p className="card-name">{name.substring(0, 30)}</p>
        </>
      )}
    </div>
  );
};
export default Card;
