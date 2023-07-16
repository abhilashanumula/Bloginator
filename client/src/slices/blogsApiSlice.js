import { apiSlice } from "./apiSlice";
const URL = '/api/blogs'

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create: builder.mutation({
            query: (data) => ({
                url: `${URL}/create`,
                method: 'POST',
                body: data
            })
        }),
        get: builder.mutation({
            query: () => ({
                url: `${URL}/`,
                method: 'GET'
            })
        }),
        getOne: builder.mutation({
            query: (blogId) => ({
                url: `${URL}/${blogId}`,
                method: 'GET'
            })
        }),
        updateBlog: builder.mutation({
            query: (data) => ({
                url: `${URL}/update`,
                method: 'PUT',
                body: data
            })
        }),
        deleteBlog: builder.mutation({
            query: (data) => ({
                url: `${URL}/delete`,
                method: 'DELETE',
                body: data
            })
        }),
    })
})

export const { useGetMutation, useGetOneMutation, useCreateMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApiSlice;