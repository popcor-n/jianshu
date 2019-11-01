import { HeadReducer } from '../common/header/store/reducer'
import { HomeReducer } from '../pages/home/store/reducer'
import { DetailReducer } from '../pages/detail/store/reducer'
import { LoginReducer } from '../pages/login/store/reducer'
import { WriteReducer } from '../pages/write/store/reducer'
import { SignupReducer } from '../pages/signup/store/reducer'
import { combineReducers } from 'redux-immutable';
const reducer = combineReducers({
    header:HeadReducer,
    home:HomeReducer,
    detail:DetailReducer,
    login:LoginReducer,
    write:WriteReducer,
    signup:SignupReducer
});
export default reducer;