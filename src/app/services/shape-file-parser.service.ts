import { Injectable } from '@angular/core';
import { CustomShape } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ShapeFileParserService {

  parseFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let polygonData: any[] = [];
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const lines = (event.target.result as string).split('\n');
          const shapes: any[] = [];

          lines.forEach(line => {
            const parts = line.split(',');

            if (parts[0] !== 'Polygon') {
              const shapeType = parts[0];
              const x = parseInt(parts[1], 10);
              const y = parseInt(parts[2], 10);
              const zIndex = parseInt(parts[3], 10);
              const width = parseInt(parts[4], 10);
              const height = parseInt(parts[5], 10);
              const color = parts[6].trim();
              const rotate = parseInt(parts[7].split(";")[0], 10);
              const parsedShape = {
                type: shapeType,
                x,
                y,
                zIndex,
                width,
                height,
                color,
                rotate
              }
              console.log("shape -",parsedShape)
              shapes.push(parsedShape);
            } else {
              const poylgonData = line.split('"');
              const type = poylgonData[0].split(",")[0]; // extract type
              const points = poylgonData[1]; // extract points
              const additionalinfo = poylgonData[2].split(",");
              const color = additionalinfo[2].trim(); // extract color
              const rotate = additionalinfo[3].split(";")[0].trim(); // Bonus: extract rotation
              const polygonShape = {
                type,
                points,
                color,
                rotate
              }
              shapes.push(polygonShape);
            }
          });

          resolve(shapes);
        } else {
          reject('Error reading file.');
        }
      };

      reader.readAsText(file);
    });
  }
}
