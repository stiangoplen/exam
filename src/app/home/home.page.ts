import { Component } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { RegisterPage } from '../modals/register/register.page';
import { HttpClient } from '@angular/common/http';
import { SamplesPage } from '../modals/samples/samples.page';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  samples
  selectedSamples = []

  patient = {
    firstname: "",
    lastname: ""
  }

  constructor(
    private http: HttpClient,
    public modalController: ModalController,
    private toastController: ToastController,
    private titleService: Title,
    private alertController: AlertController
  ) {
    this.fetchSamples()
    this.titleService.setTitle(`${this.titleService.getTitle()} - (${this.selectedSamples.length})`)
  }

  async fetchSamples(){
    this.samples = await this.http.get("./assets/analyser.json").toPromise()
  }

  async onAddPatient(){
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        firstname: this.patient.firstname,
        lastname: this.patient.lastname
      },
      cssClass: "small-modal",
      backdropDismiss: false
    })
    await modal.present()

    const { data } = await modal.onWillDismiss()

    if(data){
      this.patient.firstname = data.firstname
      this.patient.lastname = data.lastname
    }
  }

  async onAddSamples(){
    const modal = await this.modalController.create({
      component: SamplesPage,
      componentProps: {
        samples: this.samples,
        selectedSamples: this.selectedSamples.slice()
      },
      backdropDismiss: false,
      cssClass: "large-modal"
    })
    await modal.present()

    const { data } = await modal.onWillDismiss()

    if(data){
      this.selectedSamples = data.selectedSamples.slice()

      let title = this.titleService.getTitle().split(" - ")[0]
      this.titleService.setTitle(`${title} - (${this.selectedSamples.length})`)
    }
  }

  async sendOrder(){

    console.log("SENDING ORDER")
    console.log("Pasient:", this.patient)
    console.log("Analyser:", this.selectedSamples)

    this.patient = {
      firstname: "",
      lastname: ""
    }

    this.selectedSamples = []

    const toast = await this.toastController.create({
      message: 'Bestillingen er sendt',
      duration: 4000
    })
    toast.present()
  }

  async removeSample(id){
    const alert = await this.alertController.create({
      header: 'Er du sikker?',
      message: 'Analysen vil bli slettet fra listen.',
      buttons: [
        {
          text: 'Avbryt',
          role: 'cancel'
        }, {
          text: 'Ja',
          handler: () => {
            let index = this.selectedSamples.findIndex(el => el.id === id)
            this.selectedSamples.splice(index, 1)

            let title = this.titleService.getTitle().split(" - ")[0]
            this.titleService.setTitle(`${title} - (${this.selectedSamples.length})`)
          }
        }
      ]
    })
    await alert.present()
  }
}
