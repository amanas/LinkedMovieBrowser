import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/of';

@Injectable({providedIn: 'root'})
export class ImdbService {

  constructor(private http: HttpClient) {
  }

  findFilms(name: string) {
    const q = ' ' +
      'PREFIX  dc: <http://purl.org/dc/terms/>' +
      'PREFIX  film: <http://data.linkedmdb.org/resource/movie/film>' +
      'SELECT  ?label ?resource ' +
      'WHERE { ?resource dc:title ?label.' +
      `FILTER  regex(?label, "${name}", "i")}`;
    return this.runQuery(q);
  }

  getFilmActors(filmURI) {
    const q = ' ' +
      'PREFIX  mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'SELECT  ?uri ?name ' +
      `WHERE { <${filmURI}> mdb:actor ?uri. ` +
      '        ?uri mdb:actor_name ?name. }';
    return this.runQuery(q);
  }

  getFilmDirectors(filmURI) {
    const q = '' +
      'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'SELECT ?uri ?name ' +
      `WHERE { <${filmURI}> mdb:director ?uri. ` +
      '        ?uri mdb:director_name ?name. }';
    return this.runQuery(q);
  }

  getActorFilms(actorURI) {
    const q = '' +
      'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'PREFIX dc: <http://purl.org/dc/terms/>  ' +
      'SELECT  ?uri ?title ' +
      `WHERE { ?uri mdb:actor <${actorURI}>. ` +
      '        ?uri dc:title ?title. }';
    return this.runQuery(q);
  }

  getDirectorFilms(directorURI) {
    const q = '' +
      'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'PREFIX dc: <http://purl.org/dc/terms/>  ' +
      'SELECT  ?uri ?title ' +
      `WHERE { ?uri mdb:director <${directorURI}>. ` +
      '        ?uri dc:title ?title. }';
    return this.runQuery(q);
  }

  getActorDirectors(actorURI) {
    const q = '' +
      'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'SELECT ?uri ?name ' +
      `WHERE  { ?movie mdb:actor <${actorURI}>. ` +
      '         ?movie mdb:director ?uri. ' +
      '         ?uri   mdb:director_name ?name. ' +
      '}';
    return this.runQuery(q);
  }

  getDirectorActors(directorURI) {
    const q = '' +
      'PREFIX mdb: <http://data.linkedmdb.org/resource/movie/> ' +
      'SELECT ?uri ?name ' +
      `WHERE  { ?movie mdb:director <${directorURI}>. ` +
      '         ?movie mdb:actor ?uri. ' +
      '         ?uri   mdb:actor_name ?name. ' +
      '}';
    return this.runQuery(q);
  }

  runQuery(query) {
    const q = `https://imdbproxy.herokuapp.com/sparql?query=${query}&output=json`;
    return this.http.jsonp(q, 'callback');
  }


  // findImage(query) {
  //   const q = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=50&titles=' + query;
  //   return this.http.jsonp(q, 'callback');
  // }
}

