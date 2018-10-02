import { SexoNomeModule } from './sexo-nome.module';

describe('SexoNomeModule', () => {
  let sexoNomeModule: SexoNomeModule;

  beforeEach(() => {
    sexoNomeModule = new SexoNomeModule();
  });

  it('should create an instance', () => {
    expect(sexoNomeModule).toBeTruthy();
  });
});
