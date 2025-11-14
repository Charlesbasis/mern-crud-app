import Item from "./Item";

const ItemList = ({ items, onEdit, onDelete }) => {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item
          key={item._id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      ))}
    </div>
  );
};

export default ItemList;
