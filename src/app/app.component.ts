import { YoutubeService } from './youtube.service';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'youtube-trending';
  countries$ = this.youtubeService.getAllCountry().pipe(
    map((countries) => {
      const sortedCountries = countries.sort(function (a, b) {
        const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        // names must be equal
        return 0;
      });
      return sortedCountries.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
    })
  );
  countryTrendingYoutubeVideos = this.youtubeService.trendingVideos;
  p = 1;

  constructor(private youtubeService: YoutubeService) {}

  selectCountry(event) {
    let alpha2code = event.target.value;
    this.youtubeService.selectCountry(alpha2code);
  }

  getVideo(id: string) {
    return `https://www.youtube.com/embed/${id}`;
  }
}
