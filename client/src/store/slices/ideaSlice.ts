import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Idea {
  id: string;
  title: string;
  description: string;
  contentType: 'blog' | 'video' | 'social';
  keywords: string[];
  createdAt: string;
  isSaved: boolean;
}

interface IdeasState {
  ideas: Idea[];
  savedIdeas: Idea[];
  loading: boolean;
  error: string | null;
}

const initialState: IdeasState = {
  ideas: [],
  savedIdeas: [],
  loading: false,
  error: null,
};

const ideaSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    fetchIdeasStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIdeasSuccess: (state, action: PayloadAction<Idea[]>) => {
      state.ideas = action.payload;
      state.loading = false;
    },
    fetchIdeasFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveIdea: (state, action: PayloadAction<Idea>) => {
      const idea = action.payload;
      idea.isSaved = true;
      state.savedIdeas.push(idea);
    },
    removeSavedIdea: (state, action: PayloadAction<string>) => {
      state.savedIdeas = state.savedIdeas.filter(idea => idea.id !== action.payload);
    },
  },
});

export const { 
  fetchIdeasStart, 
  fetchIdeasSuccess, 
  fetchIdeasFailure,
  saveIdea,
  removeSavedIdea
} = ideaSlice.actions;

export default ideaSlice.reducer;
