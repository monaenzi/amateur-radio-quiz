const DB_NAME = 'quizapp_db'
const DB_VERSION = 1

export const initDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains('sync_queue')) {
        const store = db.createObjectStore('sync_queue', { keyPath: 'id', autoIncrement: true })
        store.createIndex('timestamp', 'timestamp', { unique: false })
      }

      if (!db.objectStoreNames.contains('questions')) {
        db.createObjectStore('questions', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('stats')) {
        db.createObjectStore('stats', { keyPath: 'subject' })
      }

      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'id', autoIncrement: true })
      }
    }
  }) as Promise<IDBDatabase>
}

export const addToSyncQueue = async (
  action: 'create' | 'update' | 'delete',
  endpoint: string,
  data: any,
  method: string = 'POST'
) => {
  const db = await initDB()
  const tx = db.transaction('sync_queue', 'readwrite')
  const store = tx.objectStore('sync_queue')

  return new Promise((resolve, reject) => {
    const request = store.add({
      action,
      endpoint,
      data,
      method,
      timestamp: Date.now(),
      synced: false,
    })
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })
}

export const getUnSyncedQueue = async (): Promise<Array<{
  id: number
  action: 'create' | 'update' | 'delete'
  endpoint: string
  data: any
  method: string
  timestamp: number
  synced: boolean
}>> => {
  const db = await initDB()
  const tx = db.transaction('sync_queue', 'readonly')
  const store = tx.objectStore('sync_queue')

  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as any[])
  })
}

export const removeSyncedItem = async (id: number) => {
  const db = await initDB()
  const tx = db.transaction('sync_queue', 'readwrite')
  const store = tx.objectStore('sync_queue')

  return new Promise((resolve, reject) => {
    const request = store.delete(id)
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(null)
  })
}

export const cacheData = async (storeName: string, data: any[]) => {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)

  data.forEach((item) => {
    store.put(item)
  })
}

export const getCachedData = async (storeName: string) => {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)

  return new Promise((resolve, reject) => {
    const request = store.getAll()
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result as any[])
  })
}
