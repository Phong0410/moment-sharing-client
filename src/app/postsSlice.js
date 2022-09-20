import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import posts from "../utils/apis/posts";

export const create = createAsyncThunk("posts/create", async (data) => {
  const result = await posts.create(data);
  return result;
});

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const result = await posts.getPosts();
  return result;
});

export const likePost = createAsyncThunk("posts/likePost", async (data) => {
  const result = await posts.likePost(data);
  return result;
});

export const getPostsByUser = createAsyncThunk(
  "posts/getPostsByUser",
  async (data) => {
    const result = await posts.getPostsByUser(data);
    return result;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (data) => {
  await posts.deletePost(data);
  return data.id;
});

const initialState = {
  posts: [],
  postsByUser: [],
  loading: false,
  creating: false,
  deleting: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
    clearPostsByUser: (state) => {
      state.postsByUser = [];
    },
  },
  extraReducers: {
    [create.pending]: (state) => {
      state.creating = true;
    },
    [create.fulfilled]: (state, action) => {
      state.creating = false;
      state.postsByUser.unshift(action.payload);
    },
    [create.rejected]: (state) => {
      state.creating = false;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    [getPostsByUser.pending]: (state) => {
      state.loading = true;
    },
    [getPostsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.postsByUser = action.payload;
    },
    [getPostsByUser.rejected]: (state) => {
      state.loading = false;
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.postsByUser = state.postsByUser.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    [deletePost.pending]: (state) => {
      state.deleting = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.deleting = false;
      state.postsByUser = state.postsByUser.filter(
        (post) => post._id !== action.payload
      );
    },
    [deletePost.rejected]: (state) => {
      state.deleting = false;
    },
  },
});

export const { clearPosts, clearPostsByUser } = postsSlice.actions;

export default postsSlice.reducer;
