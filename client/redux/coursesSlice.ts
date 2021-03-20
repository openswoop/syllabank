import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '../lib/firebase';
import { Course, courseConverter } from '../types/Course';

const initialState = {
  course: undefined as Course | undefined,
  loading: false,
};

// Thunk for fetching courses
export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (courseId: string | undefined) => {
    if (!courseId) return undefined;

    const db = firebase.firestore();
    const result = await db
      .collection('courses')
      .withConverter(courseConverter)
      .doc(courseId)
      .get();

    return result.data();
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCourseById.fulfilled, (state, action) => {
      state.loading = false;
      state.course = action.payload;
    });
  },
});

export const { reducer } = coursesSlice;
