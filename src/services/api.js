import { auth, db, FieldValue, GoogleAuthProvider, storage } from './firebase'

export async function fetchPosts(filters) {
  const collection = db.collection('photos')
  const data = await collection.get()

  let posts = data.docs.map((d) => ({ id: d.id, ...d.data() }))
  await Promise.all(
    posts.map(
      async (post, index) =>
        (posts[index].user = await fetchUserByEmail(post.user))
    )
  )

  if (filters.searchTerms !== '') {
    const searchRegexp = new RegExp(filters.searchTerms, 'i')

    posts = posts.filter((p) => p.description.match(searchRegexp))
  }

  if (filters.sort.includes('+')) {
    posts = posts.sort((a, b) => a.likes.length - b.likes.length)
  } else {
    posts = posts.sort((a, b) => b.likes.length - a.likes.length)
  }

  return posts
}

export async function fetchUserPosts(email) {
  const collection = db.collection('photos')
  const { docs } = await collection.where('user', '==', email).get()

  return docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchUserBookmarks(userId) {
  const collection = db.collection('users')
  const doc = await collection.doc(userId).get()

  const bookmarkIds = doc.data().bookmarks

  let bookmarks = bookmarkIds.map((id) => fetchPostById(id))
  bookmarks = await Promise.all(bookmarks)

  return bookmarks
}

async function fetchPostById(id) {
  const collection = db.collection('photos')
  const doc = await collection.doc(id).get()

  return {
    id: doc.id,
    ...doc.data(),
  }
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

export async function toggleBookmarkPost({ isBookmarked, postId, email }) {
  const collection = db.collection('users')

  const data = await collection.where('email', '==', email).get()

  await collection.doc(data.docs[0].id).update({
    bookmarks: !isBookmarked
      ? FieldValue.arrayRemove(postId)
      : FieldValue.arrayUnion(postId),
  })

  const doc = await collection.doc(data.docs[0].id).get()

  return {
    id: doc.id,
    ...doc.data(),
  }
}

export async function addPost(post) {
  const photoSrc = await uploadFile(post.src)

  const collection = db.collection('photos')
  const doc = await collection.add({ ...post, src: photoSrc })

  const data = await collection.doc(doc.id).get()

  return {
    id: data.id,
    ...data.data(),
  }
}

async function uploadFile(file) {
  const ref = storage.ref('photos')
  const fileRef = ref.child(file.name)

  const uploaded = await fileRef.put(file)

  return uploaded.ref.getDownloadURL()
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const res = await auth.signInWithPopup(provider)

  const collection = db.collection('users')
  const usersData = await collection.get()
  const existingUser = usersData.docs.some(
    (d) => d.data().email === res.user.providerData[0].email
  )
  if (!existingUser)
    await collection.add({ bookmarks: [], ...res.user.providerData[0] })

  return {
    id: usersData.docs[0].id,
    ...usersData.docs[0].data(),
  }
}

export async function fetchUserByEmail(email) {
  const collection = db.collection('users')
  const data = await collection.get()

  const user = data.docs.find((d) => d.data().email === email)

  return { id: user.id, ...user.data() }
}

export const signOut = async () => await auth.signOut()
