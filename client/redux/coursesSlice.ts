import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadFirebase } from '../lib/db';
import { toTermName } from '../utils/converters';
import { Course, CourseSnapshot } from '../types/Course';

const initialState = {
  courseResults: [],
  loading: false,
};

// Thunk for fetching courses
export const fetchCourseById = createAsyncThunk('courses/fetchById', async (courseId: string) => {
  const firebase = await loadFirebase();
  const db = firebase.firestore();
  return db
    .collection('courses')
    .where('course', '==', courseId)
    .orderBy('year', 'desc')
    .orderBy('term', 'desc')
    .orderBy('last_name')
    .limit(100)
    .get()
    .then((res) => res.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CourseSnapshot)))
    .then((data) => data.map((row): Course => ({ ...row, term: toTermName(row.term) })));
});

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
      state.courseResults = action.payload;
    });
  },
});

export const { reducer } = coursesSlice;
