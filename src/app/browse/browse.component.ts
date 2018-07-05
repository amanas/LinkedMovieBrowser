import {CommunicatorService} from '../communicator.service';
import {Component, OnInit} from '@angular/core';
import {ImdbService} from '../imdb.service';
import {ToastrService} from 'ngx-toastr';
import {DataSet, Edge, IdType, Network, Node} from 'vis';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})

export class BrowseComponent implements OnInit {

  center;
  nodes;
  edges;
  net;

  constructor(
    private imdbService: ImdbService,
    private toastr: ToastrService,
    private communicatorService: CommunicatorService) {
  }

  createNetwork() {
    this.nodes = new DataSet();
    this.edges = new DataSet();
    const container = document.getElementById('mynetwork');
    const data = {nodes: this.nodes, edges: this.edges};
    const options = {
      autoResize: true,
      height: Math.round(window.screen.height * 0.80) + 'px',
      nodes: {
        size: 16,
        shape: 'box',
        margin: 10,
        widthConstraint: {
          maximum: 200
        }
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: {iterations: 150}
      },
      edges: {
        font: {
          size: 12
        },
        widthConstraint: {
          maximum: 90
        },
        color: {
          inherit: 'to'
        }
      }
    };
    this.net = new Network(container, data, options);
  }

  ngOnInit() {
    this.createNetwork();
    this.setCenter({type: 'searchTerm', id: 'Love', label: 'Search term: Love', color: 'yellow'});
    this.communicatorService.change.subscribe(searchTerm => {
      this.findMovies(searchTerm);
    });
  }


  findMovies(v) {
    this.createNetwork();
    this.setCenter({type: 'searchTerm', id: v, label: 'Search term: ' + v, color: 'yellow'});
  }

  setCenter(c) {
    this.center = c;
    this.renderGraph();
  }

  private newNode(type) {
    const color = {actor: '#ff0000', film: 'rgb(0, 255, 0)', director: 'rgb(0, 191, 255)'}[type];
    return function (elem) {
      try {
        return {type: type, id: elem.resource.value, label: elem.label.value, color: color};
      } catch (e) {
        try {
          return {type: type, id: elem.uri.value, label: elem.name.value, color: color};
        } catch (e) {
          return {type: type, id: elem.uri.value, label: elem.title.value, color: color};
        }
      }
    };
  }

  private newEdge(from) {
    return function (elem) {
      try {
        return {from: from, to: elem.resource.value, id: from + '-' + elem.resource.value};
      } catch (e) {
        return {from: from, to: elem.uri.value, id: from + '-' + elem.uri.value};
      }
    };
  }

  private updateGraph(type) {
    const that = this;
    return function (data) {
      that.nodes.update(data.results.bindings.map(that.newNode(type)));
      that.edges.update(data.results.bindings.map(that.newEdge(that.center.id)));
    };
  }

  private renderGraph() {

    const that = this;
    const errorHandler = function (error) {
      that.toastr.error(error.statusText, 'LinkedMDB no disponible!');
    };

    this.net.on('click', function onClick(params) {
      that.setCenter(that.nodes.get(params.nodes[0]));
    });

    if (this.center.type === 'searchTerm') {
      this.nodes.update([this.center]);
      this.imdbService.findFilms(this.center.id).subscribe(this.updateGraph('film'), errorHandler);
    } else if (this.center.type === 'actor') {
      this.imdbService.getActorFilms(this.center.id).subscribe(this.updateGraph('film'), errorHandler);
      this.imdbService.getActorDirectors(this.center.id).subscribe(this.updateGraph('director'), errorHandler);
    } else if (this.center.type === 'director') {
      this.imdbService.getDirectorFilms(this.center.id).subscribe(this.updateGraph('film'), errorHandler);
      this.imdbService.getDirectorActors(this.center.id).subscribe(this.updateGraph('actor'), errorHandler);
    } else if (this.center.type === 'film') {
      this.imdbService.getFilmActors(this.center.id).subscribe(this.updateGraph('actor'), errorHandler);
      this.imdbService.getFilmDirectors(this.center.id).subscribe(this.updateGraph('director'), errorHandler);
    }
  }
}















