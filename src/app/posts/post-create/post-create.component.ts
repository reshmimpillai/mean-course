import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
 // @Output() postCreated = new EventEmitter<Post>();
  constructor(private postService:PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    // const post: Post = {
    //   title:  form.value.tittle,
    //   content: form.value.content
    // };
    console.log(form);
  //  this.postCreated.emit(post);
  this.postService.postPostData(form.value.tittle, form.value.content);
  form.reset();

    }

}
