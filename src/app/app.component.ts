import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShapeViewerComponent } from './components/shape-viewer/shape-viewer.component';
import { ShapeFileParserService } from './services/shape-file-parser.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShapeViewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Shape Viewer';
  @ViewChild(ShapeViewerComponent) shapeViewerComponent!: ShapeViewerComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private readonly svs: ShapeFileParserService) { }
  fileName: string = "Open shape file";

  onChange(event: any) {
    const allowedExtensions = ['shapefile'];
    const fileExtension = event.target.files[0].name.split('.').pop()?.toLowerCase();

    if (allowedExtensions.includes(fileExtension ?? '')) {
      this.fileName = event.target.files[0].name;
    }

    this.shapeViewerComponent.onFileSelected(event.target.files[0]);
    this.fileInput.nativeElement.value = '';
  }
}
