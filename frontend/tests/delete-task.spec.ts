import { test, expect } from '@playwright/test'
import { AuthPage, HomePage } from './utils'

const credentials = {
  email: 'corta.hugo@gmail.com',
  password: '123456'
}

test('Use case: delete task', async ({ page }) => {
  const taskName = 'delete task test' + Math.random()
  const authPage = new AuthPage(page)
  const homePage = new HomePage(page)

  await authPage.goTo()
  await authPage.fillCrendentials(credentials.email, credentials.password)
  await authPage.submit()
  await homePage.createNewTask(taskName)
  const result = await homePage.deleteTask(taskName)

  await expect(result).toBeTruthy()
})
