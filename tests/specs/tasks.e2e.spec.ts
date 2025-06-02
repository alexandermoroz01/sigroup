import { test, expect } from '@fixtures/fixtures';

test.describe.configure({ mode: 'serial' })

test('Task management', async ({ mainPage }) => {

  await test.step('Open the site', async () => {
    await mainPage.open();
  });

  await test.step('Add two tasks: "Buy milk" and "Read book"', async () => {
    await mainPage.createTask('Buy milk');
    await mainPage.createTask('Read book');
  });

  await test.step('Check "Buy milk" as completed', async () => {
    await mainPage.checkCompleteTaskByText('Buy milk');
  });

  await test.step('Check 2 items are visible and count label has "1 item left"', async () => {
    expect(await mainPage.getTodoItem().count()).toBe(2);
    expect(await mainPage.getCountLabelText()).toBe('1 item left');
  });

  await test.step('Delete "Buy milk" task', async () => {
    await mainPage.clickDeleteBtnByText('Buy milk');
    expect(await mainPage.getTodoItem().count()).toBe(1);
    await expect(mainPage.getTodoItem('Read book')).toBeVisible();
  });

});

test.afterEach(async ({ mainPage }) => {
    await mainPage.deleteAllTasks();
});