import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, Subscription } from 'Rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/Operators';
import { error } from '@angular/compiler/src/util';
import { concat } from 'rxjs/internal/observable/concat';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{message: string, posts: Post[]} >('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath
        };
      });
    }))
    .subscribe((transformedPost) => {
      // this.posts = postData.posts;
      this.posts = transformedPost;

      this.postUpdated.next([...this.posts]);
    }

    );
  }

  getUpdatedPost() {
    return this.postUpdated.asObservable();
  }

  postPostData(title: string, content: string, image: File) {
  console.log(image);
   // const post: Post = {id: null, title: title, content: content};

  //  Using Form data to send file with post

  const postData = new FormData();
  postData.append('title', title);
  postData.append('content', content);
  postData.append('image', image, title);
  console.log('mu post data');
  console.log(postData);
// Returning message and postId from backend**************************

    // this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', postData)
    // .subscribe((responseData) => {
    //   console.log(responseData.message);
    //   const post: Post = {
    //     id: responseData.postId,
    //     title: title,
    //     content: content
    //   };
    //   post.id = responseData.postId;

    //   this.posts.push(post);
    //   this.postUpdated.next([...this.posts]);
    // });

// Returning message and post object from backend**************************
    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
    .subscribe((responseData) => {
      console.log(responseData.message);
      const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        imagePath: responseData.post.imagePath
      };
      post.id = responseData.post.id;

      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });

 }

 deletePost(postId: string) {
  this.http.delete('http://localhost:3000/api/posts/' + postId)
  .subscribe(() => {
    console.log('post deleted!');
    const updatedPost = this.posts.filter(post => post.id !== postId);
     this.posts = updatedPost;
    this.postUpdated.next([...this.posts]);

  }, (err) => {
    console.log('post error!', err);
  });
 }
}
