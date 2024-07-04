import React, { useState } from 'react';
import axios from 'axios';
import EditForm from './EditForm';

function NavigationList({ entries, fetchEntries, filter }) {
    const [editingId, setEditingId] = useState(null);

    const deleteEntry = async (id) => {
        try {
            await axios.post(`http://localhost:8080/delete/${id}`);
            fetchEntries();
        } catch (error) {
            console.error('There was an error deleting the entry!', error);
        }
    };

    const toggleEdit = (id) => {
        setEditingId(editingId === id ? null : id);
    };

    if (!entries) {
        return <div>Loading...</div>;
    }

    const filteredEntries = entries.filter(entry => entry.category.toLowerCase().includes(filter.toLowerCase()));

    const groupedEntries = filteredEntries.reduce((categories, entry) => {
        if (!categories[entry.category]) {
            categories[entry.category] = [];
        }
        categories[entry.category].push(entry);
        return categories;
    }, {});

    return (
        <div className="flex flex-wrap -mx-4">
            {Object.keys(groupedEntries).map((category) => (
                <div key={category} className="mb-8 px-4 w-full sm:w-1/2 lg:w-1/3">
                    <div className="p-4 border rounded shadow-lg flex flex-col h-full">
                        <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                        <ul className="flex flex-col space-y-4">
                            {groupedEntries[category].map((entry) => (
                                <li key={entry.id} className="flex items-center space-x-4 p-2 bg-gray-100 rounded shadow-md">
                                    {editingId === entry.id ? (
                                        <EditForm entry={entry} fetchEntries={fetchEntries} toggleEdit={() => toggleEdit(entry.id)} />
                                    ) : (
                                        <>
                                            <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{entry.name}</a>
                                            <button onClick={() => deleteEntry(entry.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                                            <button onClick={() => toggleEdit(entry.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NavigationList;
