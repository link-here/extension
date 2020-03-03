import React, {useState, useEffect} from 'react';
import APIClient from '../lib/api-client';
import {Link} from '@linkhere/backend';
import store from 'store2';
import LinkPreview from './link-preview';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowCircleLeft, faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';
import './styles/links-container.scss';

const N_LINKS_DISPLAYED = 3;

export default (): React.ReactElement => {
  const client = new APIClient({endpoint: store('endpoint'), token: store('token')});

  const [hasMoreLinks, setHasMoreLinks] = useState(false);
  const [links, setLinks] = useState<Link[]>(store('links') ? store('links') : []);
  const [displayedLinks, setDisplayedLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);

  const getOffset = (p: number = page): number => p * N_LINKS_DISPLAYED;

  // Run once on load
  useEffect(() => {
    (async () => {
      const {links: l, hasMore} = await client.getLinks({hidden: false});

      setHasMoreLinks(hasMore);

      store('links', l);
      setLinks(l);
    })();
  }, []);

  // Updated displayed links
  useEffect(() => {
    setDisplayedLinks(links.slice(getOffset(), getOffset() + N_LINKS_DISPLAYED));
  }, [links, page]);

  const handlePageDecrease = (): void => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  const handlePageIncrease = async (): Promise<void> => {
    if (hasMoreLinks && getOffset() + N_LINKS_DISPLAYED >= links.length) {
      // Load in more links
      const res = await client.getLinks({hidden: false, skip: getOffset(page + 1)});

      setLinks([...links, ...res.links]);
      setHasMoreLinks(res.hasMore);
      setPage(page + 1);
    }

    if (getOffset() + N_LINKS_DISPLAYED < links.length) {
      setPage(page + 1);
    }
  };

  const handleLinkClick = async (_: React.MouseEvent<HTMLAnchorElement>, link: Link): Promise<void> => {
    if (store('hideOnClick')) {
      await client.updateLink(link.id, {hidden: true} as Link);
    }
  };

  return (
    <div className="links-container">
      <button onClick={handlePageDecrease} className={`button-icon ${page === 0 ? 'hidden' : ''}`}>
        <FontAwesomeIcon icon={faArrowCircleLeft}/>
      </button>

      <div className="container">
        {
          displayedLinks.map(link => (
            <LinkPreview key={link.id} link={link} api={client} onClick={async e => handleLinkClick(e, link)}/>
          ))
        }
      </div>

      <button onClick={handlePageIncrease} className={`button-icon ${links.length > (page === 0 ? N_LINKS_DISPLAYED : getOffset(page + 1)) ? '' : 'hidden'}`}>
        <FontAwesomeIcon icon={faArrowCircleRight}/>
      </button>
    </div>
  );
};
