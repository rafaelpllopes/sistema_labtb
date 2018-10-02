import { IdadeCalcModule } from './idade-calc.module';

describe('IdadeCalcModule', () => {
  let idadeCalcModule: IdadeCalcModule;

  beforeEach(() => {
    idadeCalcModule = new IdadeCalcModule();
  });

  it('should create an instance', () => {
    expect(idadeCalcModule).toBeTruthy();
  });
});
