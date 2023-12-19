import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQuestion {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface IExam {
    id: string;
    title: string;
    startAt: string | null;
    endsAt: string | null;
    difficulty: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    __questions__: IQuestion[];
}


interface IExamSlice {
    exam: IExam | null;
}

const initialState: IExamSlice = { exam: null };


export const examSlice = createSlice({
  name: 'examSlice',

  initialState,
  reducers: {
    populateExam: (state, action: PayloadAction<IExam>) => {
      state.exam = action.payload;
    }
  },
});

export const { populateExam } = examSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectQuestion = (state: RootState) => state.question;

export default examSlice.reducer;
