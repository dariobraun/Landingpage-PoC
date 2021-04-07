import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pocApp';
  blogArticles = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            blogArticles {
              title
              content
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.blogArticles = result?.data?.blogArticles;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
