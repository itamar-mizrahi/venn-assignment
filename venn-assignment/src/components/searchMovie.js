import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Paper,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
// Import the dark theme from the example above
import  darkTheme  from './darkTheme';

function MoviesSearch() {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState({ field: "", order: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${searchTerm}&page=${page}`
    );
    setMovies(response.data.data);
    setTotalPages(response.data.total_pages);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, page, sort]);

  const handleSort = (field) => {
    let order = "asc";
    if (sort.field === field && sort.order === "asc") {
      order = "desc";
    }
    setSort({ field, order });
  };

  const sortedMovies = [...movies].sort((a, b) => {
    if (a[sort.field] < b[sort.field]) {
      return sort.order === "asc" ? -1 : 1;
    }
    if (a[sort.field] > b[sort.field]) {
      return sort.order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
    <ThemeProvider theme={darkTheme}>
<Stack className="search-container" direction="row" spacing={2} mb={2}>
  <TextField
    className="search-field"
    label="Search Movies"
    variant="outlined"
    size="small"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <div className="pagination-container">
    <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
  </div>
</Stack>
<TableContainer className="table-container" component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            className="title-header"
            active={sort.field === 'Title'}
            direction={sort.field === 'Title' ? sort.order : 'asc'}
            onClick={() => handleSort('Title')}
          >
            Title
          </TableSortLabel>
        </TableCell>
        <TableCell>
          <TableSortLabel
            className="year-header"
            active={sort.field === 'Year'}
            direction={sort.field === 'Year' ? sort.order : 'asc'}
            onClick={() => handleSort('Year')}
          >
            Year
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sortedMovies.map((movie) => (
        <TableRow key={movie.imdbID}>
          <TableCell>{movie.Title}</TableCell>
          <TableCell>{movie.Year}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</ThemeProvider>
    </>
  );
}

export default MoviesSearch;
