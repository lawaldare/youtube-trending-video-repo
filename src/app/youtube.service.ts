import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiKey = 'AIzaSyDjltnL2Wyi7UdjkySyhyYsNlG0zBP6SqY';
  maxResults = '50';
  apiBaseURL = 'https://www.googleapis.com/youtube/v3/';

  countryAlpha2Code = signal<string>('MT');

  constructor(private http: HttpClient) {}

  selectCountry(alpha2code: string) {
    this.countryAlpha2Code.set(alpha2code);
  }

  private trendingVideos$ = toObservable(this.countryAlpha2Code).pipe(
    switchMap((alpha2code) => {
      return this.http.get(`${this.apiBaseURL}videos`, {
        params: new HttpParams()
          .append('part', 'snippet')
          .append('chart', 'mostPopular')
          .append('kind', 'youtube#videoListResponse')
          .append('maxResults', this.maxResults)
          .append('regionCode', alpha2code)
          .append('key', this.apiKey),
      });
    }),
    map((response: any) => {
      return response.items;
    })
  );

  trendingVideos = toSignal(this.trendingVideos$, { initialValue: [] });

  getYouTubeRegionList() {
    return this.http
      .get(`${this.apiBaseURL}i18nRegions`, {
        params: new HttpParams()
          .append('part', 'snippet')
          .append('kind', 'youtube#i18nRegionListResponse')
          .append('key', this.apiKey),
      })
      .pipe(
        map((response: any) => {
          return response.items;
        })
      );
  }
}
