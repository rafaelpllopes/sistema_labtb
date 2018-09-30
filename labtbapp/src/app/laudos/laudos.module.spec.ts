import { LaudosModule } from './laudos.module';

describe('LaudosModule', () => {
  let laudosModule: LaudosModule;

  beforeEach(() => {
    laudosModule = new LaudosModule();
  });

  it('should create an instance', () => {
    expect(laudosModule).toBeTruthy();
  });
});
