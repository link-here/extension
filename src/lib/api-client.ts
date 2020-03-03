// I'm really starting to hate rollup
import ky from 'ky/index.js';
import {APIResult, GetLinksResponse, Link} from '@linkhere/backend';

class Client {
  private readonly client: typeof ky;

  constructor({endpoint, token, version = 1}: {endpoint: string; token: string; version?: number}) {
    this.client = ky.extend({
      prefixUrl: `${endpoint}/api/v${version}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async getLinks({limit = 100, skip = 0, hidden = true}: {limit?: number; skip?: number; hidden?: boolean} = {}): Promise<GetLinksResponse> {
    const res: APIResult<GetLinksResponse> = await this.client.get('links', {
      searchParams: {
        limit,
        skip,
        hidden
      }
    }).json();

    return this.handleResponse(res);
  }

  async updateLink(id: number, link: Link): Promise<Link> {
    const res: APIResult<Link> = await this.client.put(`links/${id}`, {
      json: link
    }).json();

    return this.handleResponse(res);
  }

  async getScreenshot(id: number): Promise<string> {
    const res = await this.client.get(`screenshots/${id}`);

    const b = await res.blob();

    if (b.size === 0) {
      throw new Error('Screenshot does not exist.');
    }

    return URL.createObjectURL(b);
  }

  private handleResponse<T>(res: APIResult<T>): T {
    if (res.success) {
      return res.result;
    }

    throw new Error(res.error ? res.error : 'API error.');
  }
}

export default Client;
