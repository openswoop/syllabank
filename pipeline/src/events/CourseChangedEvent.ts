import { DocumentSnapshot } from '@google-cloud/firestore';
import { Change } from 'firebase-functions';
import { Course } from '../types/Course';

export type CourseChangedEvent = Change<DocumentSnapshot<Course>>;
