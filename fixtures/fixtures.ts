import { test as base } from '@playwright/test';
import MainPage from '@pages/main.page';
import BasePage from '@pages/base.page';

import * as fs from 'fs';

const accountData = fs.readFileSync('./environment/accounts.json', 'utf-8');
const acct = JSON.parse(accountData);

type PageObjects = {
  mainPage: MainPage;
  basePage: BasePage;
};

export const test = base.extend<PageObjects>({
  mainPage: async ({ page }, use, testInfo) => {
    await use(new MainPage(page, testInfo));
  },

  basePage: async ({ page }, use, testInfo) => {
    await use(new BasePage(page, testInfo));
  }
});

export {acct};
export {expect} from '@playwright/test';
