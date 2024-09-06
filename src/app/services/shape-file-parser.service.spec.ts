import { TestBed } from '@angular/core/testing';

import { ShapeFileParserService } from './shape-file-parser.service';

describe('ShapeFileParserService', () => {
  let service: ShapeFileParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeFileParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
