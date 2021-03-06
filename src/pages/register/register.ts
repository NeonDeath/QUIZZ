import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  usuario = [];
  usuarios = '';
  password = '';
  mail = '';


  constructor(public navCtrl: NavController, 
    public storage: Storage, 
    public alertCtrl: AlertController,
    public navParams: NavParams ) {
    
    this.navParams.get('usuarios'); 

    this.storage.keys()
    .then(keys => {
      if (keys.some(key => key == 'usuario')){

       this.storage.get('usuario')
       .then(usuario => {this.usuario = JSON.parse(usuario)});
      }
    })
  }

  clickAgregar()
  {
     if(this.password.length > 0 )
    {
      this.usuario.push({ 
        usuario: this.password + this.mail });
        this.usuarios = '';

        this.storage.set('usuario', JSON.stringify(this.usuario));
      
    }
    else 
    {
      const alert = this.alertCtrl.create({
        title: 'Invalido',
        subTitle: 'La contraseña debe tener al menos 8 caracteres',
        buttons: ['OK']
      })
      alert.present();
    }
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }



}
