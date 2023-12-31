module.exports = {
  '@tags': ['core'],

  before(browser) {
    browser.drupalInstall();
  },
  after(browser) {
    browser.drupalUninstall();
  },

  'Test login': (browser) => {
    browser
      .drupalCreateUser({
        name: 'user',
        password: '123',
        permissions: ['access site reports', 'administer site configuration'],
      })
      .drupalLogin({ name: 'user', password: '123' })
      .drupalRelativeURL('/admin/reports')
      .waitForElementVisible('body', 1000)
      .assert.textContains('h1', 'Reports')
      .assert.noDeprecationErrors();
  },
};
