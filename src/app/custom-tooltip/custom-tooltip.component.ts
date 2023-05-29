import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTooltipComponent implements OnInit, OnChanges {
  @Input() data: string = '';
  time: Date = new Date();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes happened', changes);
  }

  ngOnInit() {}
}
