import React from 'react'
import ListItem from 'components/ListItem';

const List = React.memo(function WidgetList({ items }) {
  return items.map((item, index) => (
    <ListItem item={item} index={index} key={item.id} />
  ));
});

export default List;