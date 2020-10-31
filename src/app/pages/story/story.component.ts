import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  private subscriptions: Subscription[] = [];
  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe(paramsVal =>{
        console.log(paramsVal);
      })
    )
  }
  ngOnDestroy() {
    console.log("DESTROY");
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


}
