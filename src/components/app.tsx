import React, {useState} from 'react';
import store from 'store2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import Settings from '../components/settings';
import LinksContainer from '../components/links-container';
import './styles/main.scss';

export default (): React.ReactElement => {
  const [showSettings, shouldShowSettings] = useState(store('token') === null || store('endpoint') === null);

  return (
    <div className="extension-container">
      <button className="settings-button button-icon small" onClick={() => shouldShowSettings(!showSettings)}>
        <FontAwesomeIcon icon={faCog}/>
      </button>

      {
        showSettings ? (
          <Settings onDone={() => shouldShowSettings(false)}/>
        ) : (
          <LinksContainer/>
        )
      }
    </div>
  );
};
