import React from "react";
import { useHistory } from "react-router-dom";
import Card from "components/Card";
import "./CardList.scss";

const CardList = React.memo(function({ items }) {
  const history = useHistory()
  return (
    <div className="cardlist">
      {items.map((item, index) => {
        return <Card image={item.images[0].url} key={item.id} name={item.name} id={item.id} index={index} onClick={() => {history.push("/playlist/" + item.id)}} forPlaylist />;
      })}
    </div>
  );
});
export default CardList;
