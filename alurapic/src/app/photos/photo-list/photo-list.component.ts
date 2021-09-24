import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = false;
  currentPage: number = 1;
  username: string = '';
  constructor(private activatedRoute: ActivatedRoute,
    private photoService: PhotoService){
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe()
  }
  
  ngOnInit(): void{
    this.username = this.activatedRoute.snapshot.params.username;
    this.photos = this.activatedRoute.snapshot.data['photos'];

    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter)
  }

  onKeyUp(target : any) {
    if(target instanceof EventTarget) {
      var element = target as HTMLInputElement;
      this.debounce.next(element.value);
    }
  }

  load(): void {
      this.photoService
      .listFromUserPaginated(this.username, ++this.currentPage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos)
      });

      if(!this.photos.length){
        this.hasMore = false
      }
    }
  }

