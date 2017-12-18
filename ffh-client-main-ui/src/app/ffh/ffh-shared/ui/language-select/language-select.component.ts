import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {

  languages = [
    {code: 'en', label: 'English'},
    {code: 'es', label: 'Español'},
    {code: 'fr', label: 'Français'}
  ];

  constructor (@Inject(LOCALE_ID) protected localeId: string,
               private router: Router) {

  }

  ngOnInit () {
  }

  onLanguageChange (selectedLanguage) {
    this.router.navigateByUrl(`/${selectedLanguage}/`);
  }

}
