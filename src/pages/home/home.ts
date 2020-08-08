import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers } from '@angular/http';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public platform : Platform,
    public navCtrl: NavController,
    private geolocation : Geolocation,
    private http : Http,
    private backgroundGeolocation: BackgroundGeolocation) {

      platform.ready().then(() => {
        //this.updatePosisi();
        //this.bgLocation();

         setInterval((function () {
           this.updatePosisi();
         }).bind(this), 1000);
       
    });

  }

  // ionViewDidLoad(){
  //  this.updatePosisi();
  // }

  updatePosisi() {

    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((pos) => {
      let x = pos.coords.latitude;
      let y = pos.coords.longitude;
      console.log("Lat " + x + " Lon :" + y);

    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((pos) => {
      let x = pos.coords.latitude;
      let y = pos.coords.longitude;

     
      //let headers = new Headers({ 'Content-Type' : 'application/json'});
      //let options = new RequestOptions({ headers: headers });
      //let data = JSON.stringify({ lat: x, lon: y });
        //this.http.post('http://192.168.43.45:5055/?id=nepri&lat='+ x +'&lon='+ y, data, options)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://192.168.43.45:5055');
        headers.append('Access-Control-Allow-Credentials', 'true');

        this.http.post('http://192.168.43.191:5055/?id=nopal&lat='+ x +'&lon='+ y, {headers: headers})
          .subscribe(res => {
            console.log(res.json());
          });

        // return new Promise((resolve, reject) => {
        //   this.http.post('http://192.168.43.45:8082:5055/?id=nopal&lat='+ x +'&lon='+ y, data, options)
        //   .toPromise()
        //   .then((response) =>
        //   {
        //     console.log('API Response : ', response.json());
        //     resolve(response.json());
        //   })
        //   .catch((error) =>
        //   {
        //     console.error('API Error : ', error.status);
        //     console.error('API Error : ', JSON.stringify(error));
        //     reject(error.json());
        //   });
        // });


    });
  }
	//gunakan background-geolocation agar posisi tetap dikirim pada saat aplikasi tidak aktif
  bgLocation(){
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

      this.backgroundGeolocation.configure(config)
      .then((location: BackgroundGeolocationResponse) => {

      console.log(location);
		 let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://192.168.43.45:5055');
        headers.append('Access-Control-Allow-Credentials', 'true');
		//kirim data ke server traccar dengan osman protokol
        this.http.post('http://192.168.43.191:5055/?id=nopal&lat='+ x +'&lon='+ y, {headers: headers})
          .subscribe(res => {
            console.log(res.json());
          });
      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.backgroundGeolocation.finish(); // FOR IOS ONLY

      });

      // start recording location
      this.backgroundGeolocation.start();

      // If you wish to turn OFF background-tracking, call the #stop method.
      this.backgroundGeolocation.stop();
    }

}
