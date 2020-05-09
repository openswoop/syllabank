import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchClient } from '../lib/search';
import { CourseDoc } from '../types/Course';

const initialState = {
  initialSearchState: null,
  resultsState: null,
  loading: false,
};

// Thunk for fetching initial result state (SSR)
export const hydrateSearch = createAsyncThunk('search/hydrate', async (courseId: string) => {
  const index = searchClient.initIndex('courses');
  const data = await index.search<CourseDoc>(courseId);
  return {
    searchState: { query: courseId },
    resultsState: { rawResults: [data] },
  };
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrateSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(hydrateSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.initialSearchState = action.payload.searchState;
      state.resultsState = action.payload.resultsState;
    });
  },
});

export const { reducer } = searchSlice;
