// Wrapper für API-Calls mit Offline-Support
import { addToSyncQueue, getCachedData, cacheData } from './db'

export const offlineApi = {
  // GETs - normal fetch, kein Offline-Handling hier
  async get(endpoint: string) {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error('GET error:', error)
      throw error
    }
  },

  async post(endpoint: string, data: any) {
    try {
      if (!navigator.onLine) {
        // Offline: Zur Queue hinzufügen
        console.log(`📱 Offline: Queued POST to ${endpoint}`)
        await addToSyncQueue('create', endpoint, data, 'POST')
        return { queued: true, data }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      return await response.json()
    } catch (error) {
      // Fallback zu Queue
      console.log(`⚠ Error, queuing for later: ${endpoint}`, error)
      await addToSyncQueue('create', endpoint, data, 'POST')
      return { queued: true, data }
    }
  },

  async put(endpoint: string, data: any) {
    try {
      if (!navigator.onLine) {
        console.log(`📱 Offline: Queued PUT to ${endpoint}`)
        await addToSyncQueue('update', endpoint, data, 'PUT')
        return { queued: true, data }
      }

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error(`API error: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.log(`⚠ Error, queuing for later: ${endpoint}`, error)
      await addToSyncQueue('update', endpoint, data, 'PUT')
      return { queued: true, data }
    }
  },
}
