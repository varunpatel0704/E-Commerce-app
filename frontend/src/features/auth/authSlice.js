import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: null, 
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
    login:{
      reducer(state, action){
        const { user, role, accessToken } = action.payload;
        state.user = user;
        state.role = role
        state.accessToken = accessToken;
      },
      
      prepare(user, role, accessToken){ // creates the payload object for us. we simply need to pass the required values in the action creator instead of the entire object.
        return {
          payload:{
            user,
            role,
            accessToken
          }
        }
      }
    },

    logout(state, action){
      state.user = null;
      state.accessToken = null;
    }
  }
})

// reducer will be added to the redux store
const authReducer = authSlice.reducer;
export default authReducer

// action creators, will be called inside the dispatch method of useDispatch hook
export const {login, logout} = authSlice.actions;

// selector functions to be passed to the useSelector hook
export const selectCurrentUser = (state)=>state.auth.user;
export const selectCurrentToken = (state)=>state.auth.token;
export const selectCurrentRole = (state)=>state.auth.role;