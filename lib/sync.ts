import { getUnSyncedQueue, removeSyncedItem } from './db'

export const syncOfflineChanges = async () => {
  if (!navigator.onLine) return

  const queue = await getUnSyncedQueue()

  if (queue.length === 0) return

  console.log(`Syncing ${queue.length} offline changes...`)

  for (const item of queue) {
    try {
      const response = await fetch(item.endpoint, {
        method: item.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.data),
      })

      if (response.ok) {
        await removeSyncedItem(item.id)
        console.log(`✓ Synced: ${item.action} ${item.endpoint}`)
      } else {
        console.error(`✗ Sync failed: ${item.endpoint}`)
      }
    } catch (error) {
      console.error(`Sync error for ${item.endpoint}:`, error)
    }
  }
}

export const setupSyncListener = () => {
  window.addEventListener('online', () => {
    console.log('Back online! Syncing changes...')
    syncOfflineChanges()
  })

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      const syncReg = registration as any
      if (syncReg.sync) {
        syncReg.sync.register('sync-queue').catch((err: unknown) => {
          console.warn('Background Sync nicht verfügbar, Fallback über online-Event greift trotzdem:', err)
        })
      }
    })
  }
}
