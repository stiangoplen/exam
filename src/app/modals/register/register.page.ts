import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstname
  lastname

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.firstname = this.navParams.get("firstname")
    this.lastname = this.navParams.get("lastname")
  }

  onSave(){
    this.modalController.dismiss({
      firstname: this.firstname,
      lastname: this.lastname
    })
  }

  async onCancel(){
    const alert = await this.alertController.create({
      header: 'Er du sikker?',
      message: 'Ulagret informasjon vil bli slettet.',
      buttons: [
        {
          text: 'Avbryt',
          role: 'cancel'
        }, {
          text: 'Ja',
          handler: () => {
            this.modalController.dismiss()
          }
        }
      ]
    });

    await alert.present();
    
  }
}
