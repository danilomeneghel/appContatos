import { ContactsProvider } from './../../providers/contacts/contacts';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { UtilsProvider } from '../../providers/utils/utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contacts: Observable<any>;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public utils: UtilsProvider, private provider: ContactsProvider,
    private toast: ToastController) {
    this.contacts = this.provider.getAll();
  }

  newContact() {
    this.navCtrl.push('ContactsPage');
  }

  editContact(contact: any) {
    this.navCtrl.push('ContactsPage', { contact: contact });
  }

  removeContact(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }

  doLogout() {
    this.afAuth.auth.signOut().then(() => {
      this.utils.showToast('Você foi desconectado com sucesso!');
      this.navCtrl.setRoot(LoginPage);
    }).catch(err => this.utils.showToast(err.message));
  }
}
