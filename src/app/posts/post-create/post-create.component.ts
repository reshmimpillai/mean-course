import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  imagePreview: string;
 // @Output() postCreated = new EventEmitter<Post>();
  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'image': new FormControl(null)

    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file}); // storing the file object
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    // const post: Post = {
    //   title:  form.value.tittle,
    //   content: form.value.content
    // };
    console.log(this.form);
  //  this.postCreated.emit(post);
  this.postService.postPostData(this.form.value.title, this.form.value.content, this.form.value.image);
  this.form.reset();

    }

}
