import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (value) => {
    const fetchMovieSearch = axios.get('/search/movie', {
        params: {
            query: value
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
        }
    })

    console.log("fetchMovieSearch", fetchMovieSearch.data);
    return fetchMovieSearch;
}

    export const fetchMoviePerDay = async () => {
        const fetchMovieFavDaily = axios.get('/trending/movie/day', {
            headers: {
                accept: 'application/json',
                Authorization:`Bearer ${API_KEY}`
            }
        })

        console.log("fetchMovieFavDaily", fetchMovieFavDaily)
        return fetchMovieFavDaily;
    }

export const fetchMovieById = async (movieId) => {
    const fetchMovie = axios.get(`/movie/${movieId}`, {
        headers: {
            accept: 'application/json',
            Authorization:`Bearer ${API_KEY}`
        }
    })

    return fetchMovie;
}

export const fetchMovieCredits = async (movieId) => {
    const fetchMovie = axios.get(`/movie/${movieId}?append_to_response=credits`, {
        headers: {
            accept: 'application/json',
            Authorization:`Bearer ${API_KEY}`
        }
    })

    return fetchMovie;
}

export const fetchMovieReviews = async (movieId) => {
    const fetchImgMovie = axios.get(`/movie/${movieId}?append_to_response=reviews`, {
        headers: {
            accept: 'application/json',
            Authorization:`Bearer ${API_KEY}`
        }
    })

    return fetchImgMovie;
}