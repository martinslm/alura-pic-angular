import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();

    ngOnDestroy(): void {
        this.debounce.unsubscribe()
    }

    ngOnInit(): void {
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter))
    }


    onKeyUp(target : any) {
        if(target instanceof EventTarget) {
          var element = target as HTMLInputElement;
          this.debounce.next(element.value);
        }
      }
}