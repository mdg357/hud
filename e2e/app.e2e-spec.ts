import { HudPage } from './app.po';

describe('hud App', () => {
  let page: HudPage;

  beforeEach(() => {
    page = new HudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
