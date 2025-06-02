import { expect, Locator, Page, TestInfo } from '@playwright/test';

export default class BasePage {
    public page: Page;
    public testInfo: TestInfo;
    readonly defaultTimeout: number = 150000;


    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async open(path = '') {
        await this.page.goto(`/${path}`);
    }

    async clickEnterKey(): Promise<void> {
        await this.page.keyboard.press('Enter');
    }

    async clickEscKey(): Promise<void> {
        await this.page.keyboard.press('Escape');
    }

    async hover(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
        try {
            await expect(locator).toBeVisible({timeout: timeout});
            await locator.hover({timeout: timeout});
        } catch (error) {
            console.error(`Error hovering over locator: ${locator.toString()}`, error);
            throw new Error(`Locator not visible or enabled: ${locator.toString()}`);
        }
    }

    async getElementText(locator: Locator, timeout: number = this.defaultTimeout): Promise<string | null> {
        try {
            await expect(locator).toBeVisible({timeout: timeout});
            return await locator.textContent();
        } catch (error) {
            console.error(`Error getting text from locator: ${locator.toString()}`, error);
            throw new Error(`Locator not visible or enabled: ${locator.toString()}`);
        }
    }

    async click(locator: Locator, timeout: number = this.defaultTimeout): Promise<void> {
        try{
            await expect(locator).toBeVisible({timeout: timeout});
            await expect(locator).toBeEnabled({timeout: timeout});
            await locator.click({timeout: timeout});
        } catch (error) {
            console.error(`Error clicking on locator: ${locator.toString()}`, error);
            throw new Error(`Failed to click on locator: ${locator.toString()}`);
        }
    }

    async fill(locator: Locator, value: any, timeout: number = this.defaultTimeout): Promise<void> {
        try {
            await expect(locator).toBeVisible({timeout: timeout});
            await expect(locator).toBeEnabled({timeout: timeout});
            await locator.fill(String(value), {timeout: timeout});
        } catch (error) {
            console.error(`Error filling locator: ${locator.toString()}`, error);
            throw new Error(`Locator not visible or enabled: ${locator.toString()}`);
        }
    }

    async clickTopLeftCorner() {
        await this.page.mouse.click(0, 0);
    }

    async waitFor(locator: Locator, state: 'attached' | 'detached' | 'visible' | 'hidden', timeout: number = this.defaultTimeout): Promise<void> {
        try {
            await locator.waitFor({state: state, timeout: timeout});
        } catch (error) {
            console.error(`Error waiting for locator: ${locator.toString()}`, error);
            throw new Error(`Failed to wait for locator: ${locator.toString()}`);
        }
    }
}