import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Schedule {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface Campaign {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  schedules: Schedule[];
}

interface CampaignsState {
  campaigns: Campaign[];
}

const initialState: CampaignsState = {
  campaigns: [],
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns(state, action: PayloadAction<Campaign[]>) {
      state.campaigns = action.payload;
    },
    addCampaign(state, action: PayloadAction<Campaign>) {
      state.campaigns.push(action.payload);
    },
    updateCampaign(state, action: PayloadAction<Campaign>) {
      const index = state.campaigns.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
  },
});

export const { setCampaigns, addCampaign, updateCampaign } = campaignsSlice.actions;

export default campaignsSlice.reducer;
