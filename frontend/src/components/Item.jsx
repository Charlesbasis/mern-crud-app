
const Item = ({ item, onEdit, onDelete }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-info">
        <h3>{item?.name}</h3>
        <p>{item?.description}</p>
        <p>${item?.price}</p>
      </div>
      <button className="btn btn-primary" onClick={() => onEdit(item)}>
        Edit
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(item)}>
        Delete
      </button>
    </div>
  );
};

export default Item;
