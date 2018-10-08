import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWeapon } from 'app/shared/model/weapon.model';

type EntityResponseType = HttpResponse<IWeapon>;
type EntityArrayResponseType = HttpResponse<IWeapon[]>;

@Injectable({ providedIn: 'root' })
export class WeaponService {
    private resourceUrl = SERVER_API_URL + 'api/weapons';

    constructor(private http: HttpClient) {}

    create(weapon: IWeapon): Observable<EntityResponseType> {
        return this.http.post<IWeapon>(this.resourceUrl, weapon, { observe: 'response' });
    }

    update(weapon: IWeapon): Observable<EntityResponseType> {
        return this.http.put<IWeapon>(this.resourceUrl, weapon, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWeapon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWeapon[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
