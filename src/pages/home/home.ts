import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { NewPage } from '../new/new';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registrar = NewPage;
  usuarios = [];
  mail = '';
  password = '';

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public storage: Storage) {

      this.storage.keys()
      .then (keys => {
        if (this.storage.get('datos')){
          this.storage.get ('datos')
          .then(usuarios =>{
            this.usuarios = JSON.parse(usuarios)
          })
        }
      })


  }


  clickInicio()
  {
    this.navCtrl.push(this.registrar, {usuarios: this.usuarios});
  }

  clickStart()
  {
    let index = this.usuarios.findIndex( usuario => usuario.usuario == this.mail && usuario.password == this.password)

    if (index >= 0)
    {
      const alert = this.alertCtrl.create({
        title: 'Usuario registrado',
        buttons: ['OK']
      });
      alert.present();
    }
    else 
    {
      const alert = this.alertCtrl.create({
        title: 'Usuario no registrado',
        buttons: ['OK']
      });
      alert.present();
    }

  }

}
