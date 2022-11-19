import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  apiKey = "AIzaSyDjltnL2Wyi7UdjkySyhyYsNlG0zBP6SqY";
  maxResults = "50";
  apiBaseURL = "https://www.googleapis.com/youtube/v3/videos";

  constructor(private http: HttpClient) {}

  getYoutubeTrendingVideos(alpha2code: string): Observable<any> {
    return this.http.get(this.apiBaseURL, {
      params: new HttpParams()
        .append("part", "snippet")
        .append("chart", "mostPopular")
        .append("kind", "youtube#videoListResponse")
        .append("maxResults", this.maxResults)
        .append("regionCode", alpha2code)
        .append("key", this.apiKey),
    }) as Observable<any>;
  }

  getNigeriaYoutubeTrendingVideos(): Observable<any> {
    return this.http.get(this.apiBaseURL, {
      params: new HttpParams()
        .append("part", "snippet")
        .append("chart", "mostPopular")
        .append("kind", "youtube#videoListResponse")
        .append("maxResults", this.maxResults)
        .append("regionCode", "GB")
        .append("key", this.apiKey),
    }) as Observable<any>;
  }

  getAllCountry(): Observable<any> {
    return this.http.get(
      "https://restcountries.com/v3.1/all"
    ) as Observable<any>;
  }
}
