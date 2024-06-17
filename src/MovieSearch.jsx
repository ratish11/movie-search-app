import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import movies from './moviesData';

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleRatingChange = (event) => {
    const rating = Number(event.target.value);
    setSelectedRatings((prevRating) => (prevRating === rating ? null : rating));
    // setSelectedRatings((prevRatings) =>
    //   prevRatings.includes(rating)
    //     ? prevRatings.filter((r) => r !== rating)
    //     : [...prevRatings, rating]
    // );
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchInput.toLowerCase()) &&
      (selectedRatings === null || movie.rating >= selectedRatings) &&
      // (selectedRatings.length === 0 ||
      //   selectedRatings.includes(movie.rating.toString())) &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(movie.category))
    );
  });

  // return (
  //   <div>
  //     <table>
  //       <thead>
  //         {' '}
  //         {/* Add table headers */}
  //         <tr>
  //           <th>Title</th>
  //           <th>Rating</th>
  //           <th>Genre</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {' '}
  //         {/* Search results */}
  //         {/* ... map through filtered movies and display title, rating, genre ... */}
  //       </tbody>
  //     </table>
  //     <TextField
  //       label="Search Movies"
  //       variant="outlined"
  //       onChange={handleInputChange}
  //     />
  //   </div>
  // );
  return (
    <div>
      <Autocomplete
        freeSolo
        options={filteredMovies.map((movie) => movie.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Movies"
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
      />
      <div>
        <h4>Filter by Rating</h4>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <FormControlLabel
            control={<Checkbox onChange={handleRatingChange} value={num} />}
            label={`${num} Star`}
            key={num}
          />
        ))}
      </div>
      <div>
        <h4>Filter by Category</h4>
        {['Action', 'Comedy', 'Thriller', 'Drama'].map((category) => (
          <FormControlLabel
            control={
              <Checkbox onChange={handleCategoryChange} value={category} />
            }
            label={category}
            key={category}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
