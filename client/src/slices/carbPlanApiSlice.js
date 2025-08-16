import { apiSlice } from "./apiSlice";

export const carbPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCarbPlan: builder.query({
      query: (userId) => `/carbplan/${userId}`,
      providesTags: (_r, _e, userId) => [{ type: "CarbPlan", id: userId }],
    }),
    upsertCarbPlan: builder.mutation({
      query: (body) => ({
        url: "/carbplan",
        method: "POST",
        body,
      }),
      invalidatesTags: (_r, _e, body) => [
        { type: "CarbPlan", id: body.userId },
      ],
    }),
  }),
});

export const { useGetCarbPlanQuery, useUpsertCarbPlanMutation } =
  carbPlanApiSlice;
