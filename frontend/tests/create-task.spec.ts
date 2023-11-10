import { test, expect } from '@playwright/test'
import { AuthPage, HomePage } from './utils'

const credentials = {
  email: 'corta.hugo@gmail.com',
  password: '123456'
}

test('Use case: create task', async ({ page }) => {
  const taskName = 'create task test - ' + Math.random()
  const authPage = new AuthPage(page)
  const homePage = new HomePage(page)

  await authPage.goTo()
  await authPage.fillCrendentials(credentials.email, credentials.password)
  await authPage.submit()
  const task = await homePage.createNewTask(taskName)

  await expect(task).not.toBeNull()
})
