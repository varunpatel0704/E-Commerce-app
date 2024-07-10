import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  fullName: null,
  id: null, 
  role: null,
  accessToken: null
}

// user auth state and it's corresponding reducers
const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers:{
    // login(state, action){
    //   const {user, accessToken} = action.payload;
    //   state.user = user;
    //   state.accessToken = accessToken;
    // },

    //alternate way
    loggedIn:{
      reducer(state, action){
        const { fullName, id, role, accessToken } = action.payload;
        state.id = id;
        state.role = role
        state.accessToken = accessToken;
        state.fullName = fullName;
      },
      
      prepare(fullName, id, role, accessToken){ // creates the payload object for us. we simply need to pass the required values in the action creator instead of the entire object.
        return {
          payload:{
            id,
            role,
            accessToken,
            fullName
          }
        }
      }
    },

    loggedOut(state, action){
      state.accessToken = null;
      state.id = null;
      state.role = null;
    }
  }
})

// reducer will be added to the redux store
const authReducer = authSlice.reducer;
export default authReducer

// action creators, will be called inside the dispatch method of useDispatch hook
export const {loggedIn, loggedOut} = authSlice.actions;

// selector functions to be passed to the useSelector hook
// export const selectCurrentUser = (state)=>state.auth.user;
// export const selectCurrentToken = (state)=>state.auth.token;
// export const selectCurrentRole = (state)=>state.auth.role;