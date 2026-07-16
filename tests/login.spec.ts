import { test, expect } from '@playwright/test'

test.describe('Homepage Navigation', () => {
  test('Mitglied-Anmeldung führt zur Login-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveTitle(/ÖVSV Lernkurs/)
    await page.click('Button:has-text("Mitglied anmelden")')
    await expect(page).toHaveURL('http://localhost:3000/login')
  })

  test('Gast-Zugang führt zum Dashboard', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveTitle(/ÖVSV Lernkurs/)

    await Promise.all([
      page.waitForURL('**/dashboard'),
      page.click('Button:has-text("Als Gast fortfahren →")')
    ])

    await expect(page).toHaveURL('http://localhost:3000/dashboard')
  })
})

test.describe('Login Funktionalität', () => {
  test('Login-Seite ist erreichbar', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/ÖVSV Lernkurs/)
  })

  test('Benutzer kann sich erfolgreich anmelden', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.waitForLoadState('networkidle')
    await page.fill('input[type="email"]', 'user@test.com')
    await page.fill('#password', 'password')
    await page.click('button:has-text("Einloggen")')

    await expect(page).toHaveURL(/dashboard/)
  })

  test('Ungültige Login-Daten zeigen eine Fehlermeldung', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.waitForLoadState('networkidle')
    await page.fill('input[type="email"]', 'user@.at')
    await page.fill('#password', ' ')
    await page.click('button:has-text("Einloggen")')

    await expect(page.getByText('E-Mail oder Passwort falsch')).toBeVisible()
  })
})

test.describe('Dashboard Funktionen', () => {
  test('Lernen ohne Klassenauswahl zeigt Warnmeldung', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.waitForLoadState('networkidle')

    await page.fill('input[type="email"]', 'user@test.com')
    await page.fill('#password', 'password')
    await page.click('button:has-text("Einloggen")')

    await expect(page).toHaveURL(/dashboard/)

    let alertMes = ''
    page.on('dialog', async (dialog) => {
      alertMes = dialog.message()
      await dialog.accept()
    })

    await page.click('button:has-text("Lernen")')
    expect(alertMes).toBe('Bitte wähle zuerst eine Klasse aus.')
  })
})

test.describe('Gast-Modus Navigation', () => {
  test('Login-Link führt zur Anmeldeseite', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    await page.locator('a:has-text("Login")').click()

    await expect(page).toHaveURL('http://localhost:3000/login')
  })

  test('Statistik-Link führt zur Statistik-Seite mit ausgewählter Klasse', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    const select = page.locator('select')
    await select.selectOption('3')

    await page.waitForURL('http://localhost:3000/dashboard?class=3')

    await page.getByRole('link', { name: 'Statistik' }).first().click()

    await expect(page).toHaveURL('http://localhost:3000/statistics?class=3')
  })

  test('Gast kann eine Prüfungsklasse auswählen', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')

    const select = page.locator('select')
    await select.selectOption('3')

    await expect(page).toHaveURL(/class=3/)
  })

  test('Lernen mit ausgewählter Klasse öffnet Lernbereich', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    const select = page.locator('select')
    await select.selectOption('3')

    await page.waitForURL('http://localhost:3000/dashboard?class=3')

    await page.getByRole('button', { name: 'Lernen' }).click()

    await expect(page).toHaveURL('http://localhost:3000/learn?class=3')
  })

  test('Prüfung simulieren öffnet gesperrte Prüfungsseite', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    const select = page.locator('select')
    await select.selectOption('3')

    await page.waitForURL('http://localhost:3000/dashboard?class=3')

    await page.click('button:has-text("Prüfung simulieren")')

    await expect(page).toHaveURL('http://localhost:3000/exam_locked')
  })

  test('Anmelden-Button auf gesperrter Prüfungsseite führt zur Login-Seite', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    const select = page.locator('select')
    await select.selectOption('3')

    await page.waitForURL('http://localhost:3000/dashboard?class=3')

    await page.click('button:has-text("Prüfung simulieren")')

    await expect(page).toHaveURL('http://localhost:3000/exam_locked')

    await page.click('a:has-text("Anmelden")')

    await expect(page).toHaveURL('http://localhost:3000/login')
  })

  test('Mitglied werden öffnet externe ÖVSV-Mitgliedschaftsseite', async ({ page, context }) => {
    await page.goto('http://localhost:3000/dashboard')
    await page.waitForLoadState('networkidle')

    const select = page.locator('select')
    await select.selectOption('3')

    await page.waitForURL('http://localhost:3000/dashboard?class=3')

    await page.click('button:has-text("Prüfung simulieren")')

    await expect(page).toHaveURL('http://localhost:3000/exam_locked')

    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a:has-text("Mitglied werden")'),
    ])

    await newPage.waitForLoadState()

    await expect(newPage).toHaveURL('https://www.oevsv.at/mitgliedschaft/')

    await expect(page).toHaveURL('http://localhost:3000/exam_locked')
  })


  // test('Statistik-Seite zeigt echte Fortschrittsdaten für Klasse 3 nach Login', async ({ page }) => {
  //   await page.goto('http://localhost:3000/login')
  //   await page.waitForLoadState('networkidle')
  //   await page.fill('input[type="email"]', 'user@test.com') 
  //   await page.fill('#password', 'password')            
  //   await page.click('button:has-text("Einloggen")')
  //   await expect(page).toHaveURL(/dashboard/)

  //   await page.goto('http://localhost:3000/statistics?class=3')
  //   await page.waitForLoadState('networkidle')

  //   await expect(page.locator('h2:has-text("GESAMTFORTSCHRITT")')).toBeVisible()
  //   await expect(page.locator('h2:has-text("FRAGEN")')).toBeVisible()
  //   await expect(page.locator('h2:has-text("FACHGEBIETE")')).toBeVisible()

  //   await expect(page.locator('role=progressbar').first()).toBeVisible()
  //   await expect(page.locator('p:has-text("gelernt")')).toBeVisible()
  //   await expect(page.locator('p:has-text("unsicher")')).toBeVisible()
  //   await expect(page.locator('p:has-text("offen")')).toBeVisible()

  //   await expect(page.locator('p:has-text("Recht")')).toBeVisible()
  //   await expect(page.locator('p:has-text("Technik")')).toBeVisible()
  //   await expect(page.locator('p:has-text("Betrieb")')).toBeVisible()
  // })
})
