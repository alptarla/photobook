import { auth, db, GoogleAuthProvider } from './firebase'

export async function fetchPosts() {
  const collection = db.collection('photos')
  const data = await collection.get()

  const posts = data.docs.map((d) => ({ id: d.id, ...d.data() }))
  await Promise.all(
    posts.map(async (post, index) => {
      return (posts[index].user = await fetchUserByEmail(post.user))
    })
  )

  return posts
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const res = await auth.signInWithPopup(provider)

  const collection = db.collection('users')
  const usersData = await collection.get()
  const existingUser = usersData.docs.some(
    (d) => d.data.email === res.user.providerData[0].email
  )
  if (!existingUser)
    collection.add({ bookmarks: [], ...res.user.providerData[0] })

  return res.user.providerData[0]
}

export async function fetchUserByEmail(email) {
  const collection = db.collection('users')
  const data = await collection.get()

  const user = data.docs.find((d) => d.data().email === email)

  return { id: user.id, ...user.data() }
}

export const signOut = async () => await auth.signOut()
