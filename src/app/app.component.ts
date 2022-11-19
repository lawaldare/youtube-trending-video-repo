import { YoutubeService } from "./youtube.service";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "youtube-trending";
  countries$ = this.youtubeService.getAllCountry().pipe(
    map((countries) => {
      return countries.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
    })
  );
  countryTrendingYoutubeVideos: any[];
  p = 1;

  constructor(
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.defaultNigeria();
  }

  selectCountry(event) {
    let alpha2code = event.target.value;
    this.youtubeService
      .getYoutubeTrendingVideos(alpha2code)
      .subscribe((data) => {
        this.countryTrendingYoutubeVideos = data.items;
        console.log(this.countryTrendingYoutubeVideos);
      });
  }

  defaultNigeria() {
    this.youtubeService.getNigeriaYoutubeTrendingVideos().subscribe((data) => {
      this.countryTrendingYoutubeVideos = data.items;
    });
  }

  getVideo(id: string) {
    return `https://www.youtube.com/embed/${id}`;
  }
}
