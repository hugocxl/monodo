import { type Locator, type Page } from '@playwright/test'

const dataTestsId = {
  homePage: 'home-page',
  header: 'header',
  openSearchButton: 'open-search-button',
  searchModal: 'search-modal',
  searchInput: 'search-input',
  searchList: 'seach-list',
  openNewTaskModalButton: 'open-new-task-modal-button',
  taskModal: 'task-modal',
  taskModalInput: 'task-modal-input',
  taskModalSubmitButton: 'task-modal-submit-button',
  deleteTaskButton: 'delete-task-button',
  tasksList: 'tasks-list'
}

export class HomePage {
  readonly page: Page
  readonly homePage: Locator
  readonly header: Locator
  readonly openSearchButton: Locator
  readonly searchModal: Locator
  readonly searchInput: Locator
  readonly searchList: Locator
  readonly openNewTaskModalButton: Locator
  readonly taskModal: Locator
  readonly tasksList: Locator
  readonly taskModalInput: Locator
  readonly taskModalSubmitButton: Locator
  readonly deleteTaskButton: Locator

  constructor(page: Page) {
    this.page = page
    this.tasksList = page.getByTestId(dataTestsId.tasksList)
    this.deleteTaskButton = page.getByTestId(dataTestsId.deleteTaskButton)
    this.homePage = page.getByTestId(dataTestsId.homePage)
    this.header = page.getByTestId(dataTestsId.header)
    this.openSearchButton = page.getByTestId(dataTestsId.openSearchButton)
    this.searchModal = page.getByTestId(dataTestsId.searchModal)
    this.searchInput = page.getByTestId(dataTestsId.searchInput)
    this.searchList = page.getByTestId(dataTestsId.searchList)
    this.openNewTaskModalButton = page.getByTestId(
      dataTestsId.openNewTaskModalButton
    )
    this.taskModal = page.getByTestId(dataTestsId.taskModal)
    this.taskModalInput = page.getByTestId(dataTestsId.taskModalInput)
    this.taskModalSubmitButton = page.getByTestId(
      dataTestsId.taskModalSubmitButton
    )
  }

  async goTo() {
    await this.page.goto('http://localhost:5173/')
  }

  async getTask(taskName: string) {
    const task = await this.page.getByTestId(`task-${taskName}`)

    if (Object.keys(task).length === 0) return null

    return task
  }

  async createNewTask(taskName: string) {
    await this.openNewTaskModalButton.isVisible()
    await this.openNewTaskModalButton.click()

    await this.taskModal.isVisible()
    await this.taskModalInput.fill(taskName)
    await this.taskModalSubmitButton.click()

    return this.getTask(taskName)
  }

  async deleteTask(taskName: string) {
    const task = await this.getTask(taskName)

    if (task) {
      const deleteButton = await task.getByTestId(dataTestsId.deleteTaskButton)
      await deleteButton.isEnabled()
      await deleteButton.click()
      await task.isHidden()
      return true
    }

    return false
  }
}
