import React, {useEffect, useState} from 'react';
import {Link} from '@linkhere/backend';
import APIClient from '../lib/api-client';
import './styles/link-preview.scss';

export default ({link, api, onClick}: {link: Link; api: APIClient; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void}): React.ReactElement => {
  const [src, setSrc] = useState('resources/placeholder.png');

  useEffect(() => {
    (async () => {
      try {
        setSrc(await api.getScreenshot(link.id));
      } catch (_) {}
    })();
  }, []);

  return (
    <a className="link-preview" href={link.url} onClick={onClick}>
      <img src={src}/>
      <span>{link.title}</span>
    </a>
  );
};
