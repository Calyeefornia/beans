import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ItemsService } from './../../services/items.service';

@Component({
  selector: 'app-addlisting',
  templateUrl: './addlisting.component.html',
  styleUrls: ['./addlisting.component.css']
})
export class AddlistingComponent implements OnInit {
  uploadItem: FormGroup;
  categories = ['FASHION', 'EDUCATION', 'HOMEWARE'];
  urls = new Array<string>();
  imgFile: any;
  imgFirebase: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private fb: FormBuilder,
    private router: Router,
    private itemsService: ItemsService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.uploadItem = this.fb.group({
      itemName: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  get name() {
    return this.uploadItem.get('itemName');
  }

  get price() {
    return this.uploadItem.get('price');
  }

  get description() {
    return this.uploadItem.get('description');
  }
  get category() {
    return this.uploadItem.get('category');
  }

  onSubmit(event) {
    event.preventDefault();
    this.imgFile = this.imgFirebase;
    const file = this.imgFile;
    const id = Math.random()
      .toString(36)
      .substring(2);
    const filePath = id;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.itemsService.upload(
              url,
              this.uploadItem.value.itemName,
              this.uploadItem.value.price,
              this.uploadItem.value.description,
              this.uploadItem.value.category
            );
            this.flashMessagesService.show('You have uploaded an item', {
              cssClass: 'alert-success',
              timeout: 4000
            });
            this.router.navigate(['']);
          });
        })
      )
      .subscribe();
  }
  detectImg(event) {
    this.urls = [];
    let files = event.target.files;
    this.imgFirebase = event.target.files[0];
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
