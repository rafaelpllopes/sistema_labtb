import { PacientesListModule } from './pacientes-list.module';

describe('PacientesListModule', () => {
  let pacientesListModule: PacientesListModule;

  beforeEach(() => {
    pacientesListModule = new PacientesListModule();
  });

  it('should create an instance', () => {
    expect(pacientesListModule).toBeTruthy();
  });
});
