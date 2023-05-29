import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as ace from 'ace-builds';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
const tooltip = ace.require('ace/tooltip');

@Component({
  selector: 'app-root',
  template: `
    <div
      class="app-ace-editor"
      #editor
      style="width: 500px;height: 250px;"
    ></div>
    <ng-template #dynamic></ng-template>

  `,
  styles: [
    `
      .app-ace-editor {
        border: 2px solid #f8f9fa;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild('dynamic', { read: ViewContainerRef }) private viewRef: ViewContainerRef;
  counter: number = 0;
  constructor(private viewContainerRef: ViewContainerRef) {}
  ngOnInit(): void {
    // this.loadComponent();
  }

  loadComponent() {
    this.viewRef.clear();
    const tooltipRef = this.viewRef.createComponent(CustomTooltipComponent);
    tooltipRef.setInput('data', 'tooltip ref set input');
    tooltipRef.changeDetectorRef.detectChanges();
  }
  ngAfterViewInit(): void {
    // this.loadComponent();

    ace.config.set('fontSize', '14px');
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue('<h1>Ace Editor works great in Angular!</h1>');
    aceEditor.setTheme('ace/theme/twilight');
    aceEditor.session.setMode('ace/mode/html');
    aceEditor.on('change', () => {
      console.log(aceEditor.getValue());
    });
    const docTooltip = new tooltip.HoverTooltip();
    const hoverNode = document.createElement('div');

    this.viewRef.clear();
    // const tooltipRef = this.viewRef.createComponent(CustomTooltipComponent);
    // tooltipRef.setInput('data', 'tooltip ref set input');
    // tooltipRef.changeDetectorRef.detectChanges(); // this is needed everytime setInput is changed?

    // tooltipRef.changeDetectorRef.detectChanges();
    // const componentFactory = this.cfr.resolveComponentFactory(CustomTooltipComponent);
    // const component = componentFactory.create(this.injector);
    // const componentRef = this.viewRef.createComponent(componentFactory);
    // component.instance.data = 'hello world v2';
    // component.changeDetectorRef.detectChanges();
    docTooltip.setDataProvider((e, editor) => {
      const session = editor.session;
      const docPos = e.getDocumentPosition();

      hoverNode.innerHTML = 'hello <span style="color: bold; text-weight: bold">world</span>';
      const range: Range = session.getWordRange(docPos.row, docPos.column);
      const tooltipRef = this.viewRef.createComponent(CustomTooltipComponent);
      tooltipRef.setInput('data', 'tooltip ref set input ' + this.counter++ + range.toString());
      tooltipRef.changeDetectorRef.detectChanges();
      // componentRef.instance.data = 'Hello World Data';
      // component.changeDetectorRef.detectChanges();

      // console.log(editor, range, tooltipRef, e);
      // docTooltip.showForRange(editor, range, hoverNode, e);

      // this line gets the current word that is being hovered
      docTooltip.showForRange(editor, range, tooltipRef.location.nativeElement, e);
    });

    docTooltip.addToEditor(aceEditor);
  }
}
