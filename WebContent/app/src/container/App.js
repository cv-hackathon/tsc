import Root from '../route/Root';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AddParticipantPopup from './AddParticipantPopup'
import AddOrganizationPopup from './AddOrganizationPopup'
import ServiceDetailsPopup from './ServiceDetailsPopup';
import UploadPopup from './UploadPopup/UploadPopup';
import ExportPopup from './ExportPopup/ExportPopup';
import Alert from './Alert'

function App({ store }) {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <div className='umbrella' style={{height: '100vh'}}>
            <Root />
            <AddParticipantPopup />
            <AddOrganizationPopup />
            <ServiceDetailsPopup />
            <UploadPopup />
            <ExportPopup />
            <Alert />
          </div>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
