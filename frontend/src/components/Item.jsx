import React from 'react';

const Item = ({ item, onEdit, onDelete }) => {
  
  const imageUrl = React.useMemo(() => {
    if (!item?.image) return null;
  
    try {
      const fileName = item?.image.split('/').pop();
      return `http://localhost:5000/uploads/${fileName}`;
  } catch (error) {
    console.error('Error parsing image URL:', error);
    return null;
  }
  });  
  
  // console.log('from item.jsx: item', item);
  // console.log('from item.jsx: item.image', item?.image);
  // console.log('from item.jsx: item.image type', typeof item?.image);
  return (
    <div className="item-card">
      <div className="item-info">
        <h3>{item?.name}</h3>
        <p>{item?.description}</p>
        <p>${item?.price}</p>
        <div className="item-image">
          {imageUrl ? (
            <img src={imageUrl} alt={item?.name} className="item-image" />
          ) : (
            <div>No Image</div>
          )}
        </div>
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
