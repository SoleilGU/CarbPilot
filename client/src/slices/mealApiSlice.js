import { apiSlice } from "./apiSlice";

export const mealApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // @desc Get meal list
    getMealsByDate: builder.query({
      query: ({ userId, date }) => `/meals/${userId}/${date}`,
      providesTags: (res, _err, arg) =>
        res?.length
          ? [
              ...res.map((m) => ({ type: "Meal", id: m._id })),
              { type: "Meal", id: `LIST-${arg.userId}-${arg.date}` },
            ]
          : [{ type: "Meal", id: `LIST-${arg.userId}-${arg.date}` }],
    }),

    // @desc Add a new meal, today's cache expires after triggered
    addMeal: builder.mutation({
      query: (body) => ({
        url: "/meals",
        method: "POST",
        body, //  { userId, date, mealType, items: [{name, grams}] }
        credentials: "include",
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: "Meal", id: `LIST-${arg.userId}-${arg.date}` },
      ],
    }),

    // @desc Delete meal (according to id)
    deleteMeal: builder.mutation({
      query: ({ id }) => ({
        url: `/meals/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: (_r, _e, { id, userId, date }) => [
        { type: "Meal", id },
        { type: "Meal", id: `LIST-${userId}-${date}` },
      ],
    }),
  }),
});

export const {
  useGetMealsByDateQuery,
  useAddMealMutation,
  useDeleteMealMutation,
} = mealApiSlice;
