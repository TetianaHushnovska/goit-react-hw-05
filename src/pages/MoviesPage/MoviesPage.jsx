import { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";

const searchValueSchema = Yup.object().shape({
  search: Yup.string()
    .min(3, "Min 3 chars")
    .max(30, "Max 30 chars")
    .required("This is a required field"),
});

export default function MoviesPage() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParam, setSearchParam] = useSearchParams();
  const query = searchParam.get("query") ?? "";

  const handleSubmit = (value) => {
    const newQuery = value.search;
    const nextSearchParm = new URLSearchParams();

    if (newQuery) {
      nextSearchParm.set("query", newQuery);
    } else {
      nextSearchParm.delete("query");
    }

    setSearchParam(nextSearchParm);
  };

  useEffect(() => {
    if (!query) {
      setCollection([]);
      return;
    }

    async function fetchRequestedMovie(query) {
      try {
        setLoading(true);
        const response = await fetchMovies(query);
        setCollection(response.data.results);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRequestedMovie(query);
  }, [query]);

  return (
    <div className="container">
      {loading && <strong> Loading movies...</strong>}

      <Formik
        initialValues={{ search: query ? query : "" }}
        onSubmit={handleSubmit}
        validationSchema={searchValueSchema}
      >
        <Form>
          <Field type="text" name="search" className={css.input}></Field>
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {collection.length > 0 && <MovieList collection={collection} />}
    </div>
  );
}
