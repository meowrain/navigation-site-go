import React, { useState } from 'react';
import axios from 'axios';

function EditForm({ entry, fetchEntries, toggleEdit }) {
    const [name, setName] = useState(entry.name);
    const [url, setUrl] = useState(entry.url);
    const [category, setCategory] = useState(entry.category);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/edit/${entry.id}`, { name, url, category });
            fetchEntries();
            toggleEdit();
        } catch (error) {
            console.error('There was an error updating the entry!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 bg-gray-100 rounded">
            <div className="mb-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-2">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
    );
}

export default EditForm;
