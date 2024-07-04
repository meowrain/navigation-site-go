import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddForm from './components/AddForm';
import NavigationList from './components/NavigationList';
import './App.css';

function App() {
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');

    const fetchEntries = async () => {
        try {
            const response = await axios.get('http://localhost:8096/entries');
            setEntries(response.data);
        } catch (error) {
            console.error('There was an error fetching the entries!', error);
            setError('Failed to fetch entries');
        }
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Navigation Site</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <input
                type="text"
                placeholder="Search by category"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <AddForm fetchEntries={fetchEntries} />
            <NavigationList entries={entries} fetchEntries={fetchEntries} filter={filter} />
        </div>
    );
}

export default App;
