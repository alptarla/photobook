import { auth, db, FieldValue, GoogleAuthProvider } from './firebase'

export async function fetchPosts() {
  const collection = db.collection('photos')
  const data = await collection.get()

  const posts = data.docs.map((d) => ({ id: d.id, ...d.data() }))
  await Promise.all(
    posts.map(
      async (post, index) =>
        (posts[index].user = await fetchUserByEmail(post.user))
    )
  )

  return posts
}

export async function toggleLikePost({ isLiked, postId, email }) {
  const collection = db.collection('photos')

  await collection.doc(postId).update({
    likes: !isLiked
      ? FieldValue.arrayRemove(email)
      : FieldValue.arrayUnion(email),
  })

  const doc = await collection.doc(postId).get()

  return { id: doc.id, ...doc.data() }
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
