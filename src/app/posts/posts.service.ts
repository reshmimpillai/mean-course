import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Subscription } from 'Rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post>();
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{message: string, posts: Post[]} >('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postUpdated.next([...this.posts]);
    }

    );
  }

  getUpdatedPost() {
    return this.postUpdated.asObservable();
  }

  postPostData(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });

 }
}
