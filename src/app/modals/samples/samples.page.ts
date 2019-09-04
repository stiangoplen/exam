import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.page.html',
  styleUrls: ['./samples.page.scss'],
})
export class SamplesPage implements OnInit {

  samples = []
  selectedSamples = []

  search = ""

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.samples = this.navParams.get("samples")
    this.selectedSamples = this.navParams.get("selectedSamples")
  }

  removeSample(id){
    let index = this.selectedSamples.findIndex(el => el.id === id)
    this.selectedSamples.splice(index, 1)
  }

  addSample(id){

    let existing = this.selectedSamples.find(el => el.id === id)
    if(existing) return

    let sample = this.samples.find(el => el.id === id)
    this.selectedSamples.unshift(sample)
  }

  onSave(){
    this.modalController.dismiss({
      selectedSamples: this.selectedSamples,
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
