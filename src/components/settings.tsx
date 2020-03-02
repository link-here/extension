import React, {useState} from 'react';
import store from 'store2';
import './styles/settings.scss';

export default ({onDone}: {onDone: () => void}): React.ReactElement => {
  const [token, setToken] = useState(store('token') ? store('token') : '');
  const [endpoint, setEndpoint] = useState(store('endpoint') ? store('endpoint') : '');
  const [hideOnClick, setHideOnClick] = useState(store('hideOnClick') === null ? true : store('hideOnClick'));

  const save = (): void => {
    store('token', token);
    store('endpoint', endpoint);
    store('hideOnClick', hideOnClick);

    onDone();
  };

  return (
    <div className="settings">
      <form onSubmit={save}>
        <div>
          <label>Endpoint:</label>
          <input type="url" value={endpoint} onChange={e => setEndpoint(e.target.value)} placeholder="https://linkhere.com"/>
        </div>

        <div>
          <label>Token:</label>
          <input type="text" value={token} onChange={e => setToken(e.target.value)} placeholder="10101010101010101010101010101010"/>
        </div>

        <div>
          <label>Hide links after clicking?</label>
          <input type="checkbox" checked={hideOnClick} onChange={e => setHideOnClick(e.target.checked)}/>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
