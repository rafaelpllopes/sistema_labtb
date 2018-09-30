import { LaudosListModule } from './laudos-list.module';

describe('LaudosListModule', () => {
  let laudosListModule: LaudosListModule;

  beforeEach(() => {
    laudosListModule = new LaudosListModule();
  });

  it('should create an instance', () => {
    expect(laudosListModule).toBeTruthy();
  });
});
