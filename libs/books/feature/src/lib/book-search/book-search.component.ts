import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks,
} from '@tmo/books/data-access';
import { FormControl } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Subject, of } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  unSubscribe$ = new Subject();
  searchForm = new FormControl('');

  books$ = this.store.select(getAllBooks);
  constructor(private readonly store: Store) {}

  trackByBookId(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(
        takeUntil(this.unSubscribe$),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          return of(query);
        })
      )
      .subscribe((text: string) => {
        const searchQuery = text.replace(/^\s+|\s+$/g, ''); //remove leading and trailing whitespace
        this.searchBooks(searchQuery);
      });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.setValue('javascript');
  }

  searchBooks(query: string) {
    if (query) {
      this.store.dispatch(searchBooks({ term: query }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
