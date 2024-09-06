import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ShapeFileParserService } from '../../services/shape-file-parser.service';
import { CommonModule } from '@angular/common';
import { CustomShape } from '../../constants';

@Component({
  selector: 'app-shape-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shape-viewer.component.html',
  styleUrl: './shape-viewer.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ShapeViewerComponent {
  shapes: CustomShape[] = [];

  constructor(private shapeFileParserService: ShapeFileParserService) {}

  onFileSelected(file: File) {
    if (file) {
      const allowedExtensions = ['shapefile'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (allowedExtensions.includes(fileExtension ?? '')) {
        // Proceed with parsing the file
        this.shapeFileParserService.parseFile(file)
          .then(shapes => {
            this.shapes = shapes;
          })
          .catch(error => {
            alert(`Error parsing file: ${error}`);
          });
      } else {
        // Display an error message or prevent the upload
        alert('Invalid file format. Only .shapefile files are allowed.');
      }
    }
  }
}
