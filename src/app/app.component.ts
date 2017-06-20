import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class Service {
  asyncOperation(id: number): Observable<string> {
    return null;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public id: number;
  public res: string;

  constructor(private service: Service) {}

  triggerAction(id: number) {
    this.id = id;

    this.service.asyncOperation(id).subscribe(res => {
      this.res = res;
    });
  }
}
