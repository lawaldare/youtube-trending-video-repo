import { YoutubeService } from './youtube.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'youtube-trending';
  countries: any;
  countryTrendingYoutubeVideos: any[];
  p = 1;




  constructor(private youtubeService: YoutubeService, private sanitizer: DomSanitizer){}


  ngOnInit() {

    this.getCountries();
    this.defaultNigeria();
  }


  selectCountry(event) {
    let alpha2code = event.target.value;
    this.youtubeService.getYoutubeTrendingVideos(alpha2code).subscribe(data => {
      this.countryTrendingYoutubeVideos = data.items;
      console.log(this.countryTrendingYoutubeVideos);
    });
  }

  defaultNigeria() {
    this.youtubeService.getNigeriaYoutubeTrendingVideos().subscribe(data => {
      this.countryTrendingYoutubeVideos = data.items;
    });
  }

  getCountries() {
    this.youtubeService.getAllCountry().subscribe(data => {
      this.countries = data;
    });
  }

  getVideo(id: string) {
    return `https://www.youtube.com/embed/${id}`;
  }


}
