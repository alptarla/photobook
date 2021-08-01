import { auth, db, GoogleAuthProvider } from './firebase'

export async function fetchPosts() {
  const collection = db.collection('photos')
  const data = await collection.get()

  return data.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const res = await auth.signInWithPopup(provider)

  return res.user.providerData[0]
}

export const signOut = async () => await auth.signOut()
