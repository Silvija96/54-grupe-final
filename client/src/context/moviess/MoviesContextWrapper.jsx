import { useEffect, useState } from "react";
import { initialMoviesContext } from "./initialMoviesContext";
import { MoviesContext } from "./MoviesContext";

export function MoviesContextWrapper(props) {
    const [movies, setMovies] = useState(initialMoviesContext.movies);

    useEffect(() => {
        fetch('http://localhost:5417/api/admin/movies', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setList(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function setList(data) {
        setMovies(() => data);
    }

    function create() {
    }

    function edit() {
    }

    function remove() {
    }

    const value = {
        movies,
        setList,
        create,
        edit,
        remove,
    };

    return (
        <MoviesContext.Provider value={value}>
            {props.children}
        </MoviesContext.Provider>
    );
}