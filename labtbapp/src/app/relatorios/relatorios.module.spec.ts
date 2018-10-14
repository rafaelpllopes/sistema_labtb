import { RelatoriosModule } from './relatorios.module';

describe('RelatoriosModule', () => {
  let relatoriosModule: RelatoriosModule;

  beforeEach(() => {
    relatoriosModule = new RelatoriosModule();
  });

  it('should create an instance', () => {
    expect(relatoriosModule).toBeTruthy();
  });
});
