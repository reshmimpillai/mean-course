import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'Rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy {

  // posts = [
  //   {title: 'First Post', content: 'My first post content'},
  //   {title: 'Second Post', content: 'My second post content'},
  //   {title: 'Third Post', content: 'My third post content'},  ];
 constructor(private postService: PostsService) {

 }
  // @Input() posts: Post[] = [];
  posts: Post[] = [];
  postSub: Subscription;
  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService.getUpdatedPost()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    // this.postService.getUpdatedPost()
    // .subscribe((posts: Post[]) => {
    //   this.posts = posts;
    // });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
