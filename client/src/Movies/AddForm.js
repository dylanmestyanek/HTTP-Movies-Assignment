import React, {useState} from "react"
import axios from "axios"

const AddForm = props => {
    const [movie, setMovie] = useState({
        id: Date.now(),        
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setMovie({
            ...movie,
            [name]: name === 'stars' ? value.split(',') : value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // Adds movie to end of movie's array and sends user back to home page
        axios.post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                props.setMovies(res.data)
                props.history.push("/")
            })
            .catch(err => console.log(err))
        setMovie({
            title: '',
            director: '',
            metascore: '',
            stars: []
        })
    }

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
            <button type="submit">Add Movie</button>
        </form>
    )
}

export default AddForm