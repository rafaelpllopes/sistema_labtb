import { FilterByNameModule } from './filter-by-name.module';

describe('FilterByNameModule', () => {
  let filterByNameModule: FilterByNameModule;

  beforeEach(() => {
    filterByNameModule = new FilterByNameModule();
  });

  it('should create an instance', () => {
    expect(filterByNameModule).toBeTruthy();
  });
});
