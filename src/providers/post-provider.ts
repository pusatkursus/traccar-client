import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostProvider {
  server: string = 'http://192.168.43.45/traccar/';
  //server: string = 'http://dirapratama.jasawebaplikasi.com/api/';
  serverpulsa: string = 'https://kursuskomputer.web.id/pulsa/modul/';
  serversosmed: string = 'https://kursuskomputer.web.id/pulsa/';
  servertracar: string = 'http://192.168.43.45:5055/';
  constructor(
    public http : Http
    ) 
  {
    
  }

  postData(body, file) 
  {
    
      let type = "application/json; charset=UTF-8";
      let headers = new Headers({ 'Content-Type': type});
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server + file, JSON.stringify(body), options)
        .map(res => res.json()
        
        );
  }

  pulsa(body, file) 
  {
      
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type});
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(this.serverpulsa + file, JSON.stringify(body), options)
      .map(res => res.json());
  }

  sosmed(body, file) 
  {
        
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serversosmed + file, JSON.stringify(body), options)
      .map(res => res.json());
  }

  traccar(body, file) 
  {
        
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.servertracar + file, JSON.stringify(body), options)
      .map(res => res.json());
  }

}