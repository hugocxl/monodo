import { type Locator, type Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

const credentials = {
  email: 'corta.hugo@gmail.com',
  password: '123456'
}

export class AuthPage {
  readonly page: Page
  readonly changeViewButton: Locator
  readonly submitButton: Locator
  readonly passwordInput: Locator
  readonly emailInput: Locator

  constructor(page: Page) {
    this.page = page
    this.changeViewButton = page.locator('#change-view-button')
    this.submitButton = page.locator('#submit')
    this.passwordInput = page.locator('#input-password')
    this.emailInput = page.locator('#input-email')
  }

  async goTo() {
    await this.page.goto('http://localhost:5173/auth')
  }

  async changeView() {
    await this.changeViewButton.click()
  }

  async fillCrendentials(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async signIn() {
    await this.fillCrendentials(credentials.email, credentials.password)
    await this.submitButton.click()
  }

  async signUp() {
    await this.changeViewButton.click()
    await this.fillCrendentials(faker.internet.email(), credentials.password)
    await this.submitButton.click()
  }
}
