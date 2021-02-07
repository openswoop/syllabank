import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchClient } from '../lib/algolia';
import { CourseDoc } from '../types/Course';

const initialState = {
  inputValue: '',
  searchState: null as unknown,
  resultsState: null as unknown,
  loading: false,
};

// Thunk for fetching initial result state (SSR)
export const hydrateSearch = createAsyncThunk('search/hydrate', async (courseId: string) => {
  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_COURSES);
  const resp = await index.search<CourseDoc>(courseId);
  return {
    searchState: { query: courseId },
    resultsState: {
      metadata: [],
      rawResults: [resp],
    },
    inputValue: resp.hits.find((hit) => hit.course === courseId)?.title ?? '',
  };
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    inputValueChanged(state, action): void {
      state.inputValue = action.payload;
    },
    searchStateChanged(state, action): void {
      state.searchState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrateSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(hydrateSearch.fulfilled, (state, action) => {
      const { searchState, resultsState, inputValue } = action.payload;
      state.loading = false;
      // this should only be changed when the page changes
      if (state.inputValue !== inputValue || !state.inputValue) {
        state.searchState = searchState;
        state.resultsState = resultsState;
        state.inputValue = inputValue;
      }
    });
  },
});

export const { reducer } = searchSlice;
export const { inputValueChanged, searchStateChanged } = searchSlice.actions;
