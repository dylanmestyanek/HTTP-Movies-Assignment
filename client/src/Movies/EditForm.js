import React, {useState, useEffect} from "react"
import axios from "axios"

const EditForm = (props) => {
    console.log(props)
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    useEffect(() => {
        const movieToEdit = props.movies.find(movie => movie.id === +props.match.params.id)
        movieToEdit && setMovie(movieToEdit)
    }, [props.movies, props.match.params.id])

    const handleChange = e => {
        const {name, value} = e.target;
        setMovie({
            ...movie,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                // let filteredArr = ; 
                props.setMovies(props.movies.map(item => item.id === movie.id ? res.data : item))
                props.history.push("/");
                
            })
            .catch(err => console.log(err))
            
        setMovie({
            title: '',
            director: '',
            metascore: '',
            stars: []
        })
    }

    console.log(props.movies)

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="title"
                value={movie.title}
                placeholder="Title"
                onChange={handleChange}
            />
            <input 
                type="text"
                name="director"
                value={movie.director}
                placeholder="Director"
                onChange={handleChange}
            />
            <input 
                type="number"
                name="metascore"
                value={movie.metascore}
                placeholder="Score"
                onChange={handleChange}
            />
            <input 
                type="text"
                name="stars"
                value={movie.stars}
                placeholder="Stars"
                onChange={handleChange}
            />
            <button type="submit">Edit Movie</button>
        </form>
    )
}

export default EditForm