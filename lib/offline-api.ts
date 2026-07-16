import { addToSyncQueue, cacheData, getCachedData } from './db'

export const offlineApi = {
  async get(endpoint: string) {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const data = await response.json()
      
      if (endpoint.includes('/api/questions')) {
        if (endpoint.includes('/stats')) {
          // Stats: nur bySubject Array cachen
          await cacheData('stats', data.bySubject || [])
        } else {
          // Questions: komplettes Array
          await cacheData('questions', Array.isArray(data) ? data : [data])
        }
      }
      
      return data
    } catch (error) {
      if (!navigator.onLine) {
        console.log(`⚠ Offline: Loading from cache for ${endpoint}`)
        const cacheKey = endpoint.includes('/stats') ? 'stats' : 'questions'
        const cachedData = (await getCachedData(cacheKey)) as any[]
        if (cachedData.length > 0) {
          // Reconstruct stats format if needed
          if (cacheKey === 'stats') {
            return { bySubject: cachedData }
          }
          return cachedData
        }
      }
      console.error('Fetch error:', error)
      throw error
    }
  },

  async post(endpoint: string, data: any) {
    try {
      if (!navigator.onLine) {
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
      console.log(`⚠ Error, queuing for later: ${endpoint}`)
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
      console.log(`⚠ Error, queuing for later: ${endpoint}`)
      await addToSyncQueue('update', endpoint, data, 'PUT')
      return { queued: true, data }
    }
  },
}
