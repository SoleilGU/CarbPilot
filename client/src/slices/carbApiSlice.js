import { apiSlice } from "./apiSlice";

/**
 * Calculator:
 * POST /api/carb/calc
 * body: { items: [{ name, grams }] }
 * res: { totals:{carb,protein,fat,energy}, items:[{name,grams,carb,protein,fat,energy}] }
 */

export const carbApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calcCarbs: builder.mutation({
      query: (payload) => ({
        url: "/carb/calc",
        method: "POST",
        body: payload, // { items:[{ name, grams }] }
      }),
    }),
  }),
});

export const { useCalcCarbsMutation } = carbApiSlice;
