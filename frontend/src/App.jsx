import { useEffect, useState } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { deleteItem, getItems } from './services/api';

function App() {

  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleItemSaved = () => {
    setEditingItem(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleDelete = async (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(item._id).then(() => {
          fetchItems();
        });
      } catch (error) {
        console.log("Error deleting item:", error);
      }
    };
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  };

  return (
    <>
      <div className="App">
        <h1>CRUD App</h1>

        <ItemForm
          itemToEdit={editingItem}
          onItemSaved={handleItemSaved}
          onCancel={handleCancel}
        />

        <ItemList
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default App
