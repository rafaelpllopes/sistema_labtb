import { ButtomLoadModule } from './buttom-load.module';

describe('ButtomLoadModule', () => {
  let buttomLoadModule: ButtomLoadModule;

  beforeEach(() => {
    buttomLoadModule = new ButtomLoadModule();
  });

  it('should create an instance', () => {
    expect(buttomLoadModule).toBeTruthy();
  });
});
