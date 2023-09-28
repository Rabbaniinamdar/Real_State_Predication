import React, { useEffect, useState } from 'react';

export default function Default() {
    const [backendData, setBackendData] = useState(null); // Initialize with null

    useEffect(() => {
        fetch("http://localhost:5000/api")
            .then(response => response.json())
            .then(data => {
                setBackendData(data); // Set the entire data object
                console.log(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <h1>Assalamualaikum Rahmatullahibarakatuh</h1>
            {backendData === null ? (
                <p>Loading...</p>
            ) : (
                <p key={backendData.id}>
                     {backendData.user}
                </p>
            )}
        </div>
    );
}
