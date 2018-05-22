import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public loader;
  public lista_filmes = new Array<any>();
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private moviePrivider: MoovieProvider,
      public loadingCtrl: LoadingController
    ) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  fechaCarregando(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.carregarFilmes();
  }


  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme){
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id } );
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
    
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando();

    this.moviePrivider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        
        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();

        }else{
          this.lista_filmes = objeto_retorno.results;
        }


        this.fechaCarregando();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      },
      error => {
        console.log(error); 
        this.fechaCarregando();

        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }

      }
    )
  }

}
