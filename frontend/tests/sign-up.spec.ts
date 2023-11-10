import { test, expect } from '@playwright/test'
import { AuthPage } from './utils/auth.page'

test('Use case: sign up', async ({ page }) => {
  const authPage = new AuthPage(page)
  await authPage.goTo()
  await authPage.signUp()

  await expect(page.getByTestId('home-page')).toBeVisible()
})
