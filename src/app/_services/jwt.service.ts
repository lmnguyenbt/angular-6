import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class JwtService {
    getToken(): String {
        return window.localStorage['jwtToken'];
    }

    saveToken(token: String) {
        window.localStorage['jwtToken'] = token;
    }

    destroyToken() {
        window.localStorage.removeItem('jwtToken');
    }

    destroyAll(){
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('currentUser');
    }

    destroyUser() {
        window.localStorage.removeItem( 'currentUser' );
        window.localStorage.removeItem( 'group_permissions' );
        window.localStorage.removeItem( 'enable_permissions' );
    }

    cleanLocalStorage() {
        window.localStorage.clear();
    }
}
