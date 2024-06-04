import React, { useState, useEffect } from 'react';

const MoviesCard = ({ Movies }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card h-100 d-flex flex-row" style={{ width: '100%', minWidth: '350px' }}>
                <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title">{Movies['CLASS INCHARGE NAME']}</h5>
                    <p className="card-text">
                        <strong>Year:</strong> {Movies.YEAR}<br />
                        <strong>Semester:</strong> {Movies.SEMESTER}<br />
                        <strong>Section:</strong> {Movies.SECTION}<br />
                        <strong>Contact No.:</strong> {Movies['CONTACT NO.']}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:8080/movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies data:', error);
            }
        };
        fetchMovies();
    }, []);

    const filteredData = movies.filter(Movie =>
        Movie['CLASS INCHARGE NAME'].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="row text-center mb-3">
                <div className="col-md-4 offset-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search movies"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="row">
                {filteredData.map((Movie, index) => (
                    <MoviesCard key={index} Movies={Movie} />
                ))}
            </div>
        </div>
    );
};

export default Movies;
