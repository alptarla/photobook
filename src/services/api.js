import { db } from './firebase'

export async function fetchPosts() {
  const collection = db.collection('photos')
  const data = await collection.get()

  return data.docs.map((d) => ({ id: d.id, ...d.data() }))
}
