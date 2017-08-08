import { Html5Page } from './app.po';

describe('html5 App', () => {
  let page: Html5Page;

  beforeEach(() => {
    page = new Html5Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
