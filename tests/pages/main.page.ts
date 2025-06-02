import BasePage from '@pages/base.page';
import { Locator, Page, TestInfo, expect, test } from '@playwright/test';

class MainPage extends BasePage {
    public endpoint = 'todomvc';
    //locators
    public taskInput: Locator;
    public countLabel: Locator;
    public selectAllBtn: Locator;
    public clearCompletedBtn: Locator;

    constructor(page: Page, testInfo: TestInfo) {
        super(page, testInfo);
        this.initSelectors();
    }

    private initSelectors() {
        this.taskInput = this.page.locator(`input.new-todo`);
        this.countLabel = this.page.locator(`span.todo-count`);
        this.selectAllBtn = this.page.locator(`//label[@for="toggle-all"]`);
        this.clearCompletedBtn = this.page.locator(`button.clear-completed`);
    }

    async open(): Promise<void> {
        await super.open(`${this.endpoint}`);
    }

    async getCountLabelText(): Promise<string> {
        return await this.getElementText(this.countLabel);
    };

    async setTaskInput(value: string): Promise<void> {
        await this.fill(this.taskInput, value);
    }

    getTodoItem(text?: string, index?: number): Locator {
        if (text && index === undefined) {
            return this.page.getByTestId('todo-item').filter({has: this.page.getByTestId('todo-title').filter({ hasText: text })});
        } else if (!text && index !== undefined) {
            return this.page.getByTestId('todo-item').nth(index);
        } else if (text && index !== undefined) {
            return this.page.getByTestId('todo-item').filter({ has: this.page.getByTestId('todo-title').filter({ hasText: text }) }).nth(index);
        } else {
            return this.page.getByTestId('todo-item');
        }
    }

    getDeleteBtnByText(text: string): Locator {
        return this.getTodoItem(text).locator('.destroy');
    }

    async clickDeleteBtnByText(text: string): Promise<void> {
        await this.hover(this.getTodoItem(text));
        await this.click(this.getDeleteBtnByText(text));
    }

    getTodoCBByText(text: string): Locator {
        return this.getTodoItem(text).locator(`input[aria-label="Toggle Todo"][type="checkbox"]`);
    }

    async clickTodoCBByText(text: string): Promise<void> {
        await this.click(this.getTodoCBByText(text));
    }

    async checkCompleteTaskByText(text: string): Promise<void> {
        await this.clickTodoCBByText(text);
        let status = await this.getTodoItem(text).getAttribute('class');
        expect(status).toBe("completed");
    }

    async createTask(value: string): Promise<void> {
        await this.setTaskInput(value);
        await this.clickEnterKey();
    }

    async clickSelectAllBtn(): Promise<void> {
        await this.click(this.selectAllBtn);
    }

    async clickClearCompletedBtn(): Promise<void> {
        await this.click(this.clearCompletedBtn);
    }

    async deleteAllTasks(): Promise<void> {
        await this.clickSelectAllBtn();
        await this.clickClearCompletedBtn();
        expect(await this.getTodoItem().count()).toBe(0);
    }
}
export default MainPage;