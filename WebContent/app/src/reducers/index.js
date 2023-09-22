import { combineReducers } from "redux";
import loginReducer from './login';
import addParticipantReducer from "./addParticipantPopup";
import addOrganizationReducer from "./addOrganizationPopup";
import serviceDetailsReducer from "./serviceDetailsPopup";
import globalInfoReducer from "./globalInfo";
import uploadReducer from "./uploadPopup"
import exportPopup from "./exportPopup"
import alert from "./Alert"

const rootReducer = combineReducers({
    loginReducer,
    addParticipant: addParticipantReducer,
    addOrganization: addOrganizationReducer,
    serviceDetails: serviceDetailsReducer,
    globalInfo: globalInfoReducer,
    upload: uploadReducer,
    export: exportPopup,
    alert,
})

export default rootReducer;
