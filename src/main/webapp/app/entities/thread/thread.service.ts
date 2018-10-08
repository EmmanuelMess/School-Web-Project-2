import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThread } from 'app/shared/model/thread.model';

type EntityResponseType = HttpResponse<IThread>;
type EntityArrayResponseType = HttpResponse<IThread[]>;

@Injectable({ providedIn: 'root' })
export class ThreadService {
    private resourceUrl = SERVER_API_URL + 'api/threads';

    constructor(private http: HttpClient) {}

    create(thread: IThread): Observable<EntityResponseType> {
        return this.http.post<IThread>(this.resourceUrl, thread, { observe: 'response' });
    }

    update(thread: IThread): Observable<EntityResponseType> {
        return this.http.put<IThread>(this.resourceUrl, thread, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThread>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThread[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
