const {test, expect} = require("@playwright/test");
const {baseUrl} = require('../../constants');

function randomStr() {
    return (Math.random() + 1).toString(36).substring(7);
}

const addTodo = async (page, title) => {
    const addTitle = page.getByTestId(`todoList-addTodo-title`).locator('input');
    await addTitle.fill(title);
    
    const submitTodoBtn = page.getByTestId(`todoList-addTodo-submitBtn`);
    await submitTodoBtn.click();
}

test('Todo list - add todo to the todos list', async ({browser}) => {
    const userId = randomStr();
    const context = await browser.newContext();
    const page = await context.newPage();
    await context.addCookies([{name: "userId", value: userId, url: `${baseUrl.client}`}]);
    await page.goto(baseUrl.client)

    const title = randomStr();
    
    await addTodo(page, title);

    const newTodoTitle = page.locator('li').last().locator('span').first()
    await expect(newTodoTitle).toHaveText(title)
});