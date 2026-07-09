import { test, expect } from '@playwright/test'

test('Seite öffne', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page).toHaveTitle(/ÖVSV Lernkurs/)
})

test('Login funktioniert', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.waitForLoadState('networkidle')
  await page.fill('input[type="email"]', 'user@test.com')
  await page.fill('#password', 'password')

  // Button klicken
  await page.click('button:has-text("Einloggen")')

  // Warten auf Dashboard-Redirec
  await expect(page).toHaveURL(/dashboard/)
})

test('Fehlermeldung kommt wenn login daten falsch sind oder fehlen', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.waitForLoadState('networkidle')
  await page.fill('input[type="email"]', 'user@.at')
  await page.fill('#password', ' ')
  await page.click('button:has-text("Einloggen")')
  await expect(page.getByText('E-Mail oder Passwort falsch')).toBeVisible()
})

test('Alert kommt wenn keine Klasse ausgewählt ist', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.waitForLoadState('networkidle')

  await page.fill('input[type="email"]', 'user@test.com')
  await page.fill('#password', 'password')

  // Button klicken
  await page.click('button:has-text("Einloggen")')

  // Warten auf Dashboard-Redirec
  await expect(page).toHaveURL(/dashboard/)

  //Dialog Handler registireren BEVOR der Klick passiert
  let alertMes = ''
  page.on('dialog', async (dialog) => {
    alertMes = dialog.message()
    await dialog.accept()
  })

  await page.click('button:has-text("lernen")')
  expect(alertMes).toBe('Bitte wähle zuerst eine Klasse aus.')
})
