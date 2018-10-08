import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThreadMessage } from 'app/shared/model/thread-message.model';

type EntityResponseType = HttpResponse<IThreadMessage>;
type EntityArrayResponseType = HttpResponse<IThreadMessage[]>;

@Injectable({ providedIn: 'root' })
export class ThreadMessageService {
    private resourceUrl = SERVER_API_URL + 'api/thread-messages';

    constructor(private http: HttpClient) {}

    create(threadMessage: IThreadMessage): Observable<EntityResponseType> {
        return this.http.post<IThreadMessage>(this.resourceUrl, threadMessage, { observe: 'response' });
    }

    update(threadMessage: IThreadMessage): Observable<EntityResponseType> {
        return this.http.put<IThreadMessage>(this.resourceUrl, threadMessage, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThreadMessage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThreadMessage[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
