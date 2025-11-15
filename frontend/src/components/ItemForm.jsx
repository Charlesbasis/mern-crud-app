import { useEffect, useState } from 'react';
import { createItem, updateItem } from '../services/api';

const ItemForm = ({ itemToEdit, onItemSaved, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name || '');
      setDescription(itemToEdit.description || '');
      setPrice(itemToEdit.price?.toString() || '');
      setImagePreview(itemToEdit.imageUrl || '');
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImagePreview('');
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting form with:', { name, description, price });

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', parseFloat(price));

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (itemToEdit) {
        await updateItem(itemToEdit._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await createItem(formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Notify parent
      onItemSaved();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving item: ' + err.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>{itemToEdit ? 'Edit Item' : 'Add New Item'}</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => {
            console.log('Name changed:', e.target.value);
            setName(e.target.value);
          }}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            console.log('Description changed:', e.target.value);
            setDescription(e.target.value);
          }}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            console.log('Price changed:', e.target.value);
            setPrice(e.target.value);
          }}
          step="0.01"
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          type='file'
          name='image'
          accept='image/*'
          onChange={handleImageChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </div>

      {imagePreview && (
        <div style={{ marginBottom: '10px' }}>
          <img src={imagePreview} alt="Item Image" style={{ width: '50%', height: '50%', objectFit: 'contain' }} />
        </div>
      )}

      <div>
        <button
          type="submit"
          style={{ padding: '10px 20px', marginRight: '10px' }}
        >
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </button>

        {itemToEdit && (
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 20px' }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
