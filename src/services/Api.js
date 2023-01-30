import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://react-toolkit-app-back.vercel.app/api/v1/" }),
  endpoints: (builder) => ({
    setupUser: builder.mutation({
      query: (data) => ({
        url: `auth/${data.endPoint}`,
        method: "post",
        body: data.userData,
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Credentials": true,
        },
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `auth/updateUser`,
        method: "PATCH",
        body: data.userData,
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    currentUser: builder.query({
      query: (data) => ({
        url: "/auth/getCurrentUser",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }),
    }),

    logoutUserApi: builder.mutation({
      query: (data) => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: `auth/updatePassword`,
        method: "post",
        body: {
          password: data.password,
          confirmPassword: data.confirmPassword,
        },
        credentials: "include",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    uploadUserImage: builder.mutation({
      query: (data) => ({
        url: "/auth/uploadImage",
        method: "POST",
        credentials: "include",
        body: data.formData,
      }),
    }),

    updateUserImage: builder.mutation({
      query: (data) => ({
        url: "/auth/updateImage",
        method: "POST",
        credentials: "include",
        body: { image: data.Image },
      }),
    }),

    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/googleLogin",
        method: "POST",
        credentials: "include",
        body: { idToken: data.response.credential },
      }),
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgetPassword",
        method: "POST",
        credentials: "include",
        body: { email: data.email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/resetPassword",
        method: "POST",
        credentials: "include",
        body: { email: data.email, token: data.token, password: data.password },
      }),
    }),

    
    allProperties: builder.query({
      query: (data) => ({
        url: "property/allProperties",
        method:"GET"
      }),
    }),

    NewsLetter: builder.mutation({
      query: (data) => ({
        url: "NewsLetter",
        method: "POST",
        credentials: "include",
        body: { email: data.email},
      }),
    }),


    singleProperty: builder.query({
      query: (data) => ({
        url: `property/${data.id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "/Orders",
        method: "POST",
        credentials: "include",
        body: {product:data.product,quantity:data.quantity,color:data.color},
      }),
    }),
 
    getFilteredProperties: builder.query({
      query: (data) => ({
        url: `property?search=${data.search}&company=${data.company}&freeShipping=${data?.freeShipping}&category=${data.category}&sort=${data.sort}&price=${data.price}&color=${data.color}`,
        method: "GET",
        credentials: "include",
      }),
    }),


    
    
    deleteAllOrders: builder.mutation({
      query: (data) => ({
        url: "Orders/deleteAll",
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials:"include",
      }),
    }),
    
    userOrders: builder.query({
      query: () => ({
        url: "Orders",
        credentials:"include",
      }),
    }),


    
    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `Orders/${data.id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials:"include",
      }),
    }),
    
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `Orders/${data.id}`,
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials:"include",
        body:{quantity:data.quantity}
      }),
    }),


    loadStripe: builder.mutation({
      query: (data) => ({
        url: `/create-checkout-session`,
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials:"include",
        body:{cartItems:data.userOrders}
      }),
    }),

  }),
});

export const {
  useSetupUserMutation,
  useUpdateUserMutation,
  useCurrentUserQuery,
  useLogoutUserApiMutation,
  useUpdateUserPasswordMutation,
  useUploadUserImageMutation,
  useUpdateUserImageMutation,
  useGoogleLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useAllPropertiesQuery,
  useNewsLetterMutation,
   useSinglePropertyQuery,
   useCreateOrderMutation,
   useGetFilteredPropertiesQuery,
   useUserOrdersQuery,
   useDeleteAllOrdersMutation,
   useDeleteOrderMutation,
   useUpdateOrderMutation,
   useLoadStripeMutation
} = Api;
