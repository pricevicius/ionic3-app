import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
})
export class FilmeDetalhesPage {
  public filme;
  public filmeid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public moviePrivider: MoovieProvider
    ) {
  }

  ionViewDidEnter() {
    this.filmeid = this.navParams.get("id");
    console.log(this.filmeid);
    this.moviePrivider.getMovieDetails(this.filmeid).subscribe(
      data => {
        let retorno = (data as any)._body;
        this.filme = JSON.parse(retorno);
        console.log(this.filme);
      },
      error => {
        console.log(error);

      }
    )

  }

}
