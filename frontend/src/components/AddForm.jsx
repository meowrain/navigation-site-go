import React, { useState } from 'react';
import axios from 'axios';

function AddForm({ fetchEntries }) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/add', { name, url, category });
            setName('');
            setUrl('');
            setCategory('');
            fetchEntries();
        } catch (error) {
            console.error('There was an error adding the entry!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Site Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="url"
                    placeholder="Site URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-full"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Add</button>
        </form>
    );
}

export default AddForm;
