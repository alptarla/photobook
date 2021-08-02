import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileSkeleton = () => (
  <ContentLoader
    width={300}
    height={300}
    viewBox='0 0 450 400'
    backgroundColor='#f0f0f0'
    foregroundColor='#dedede'
  >
    <rect x='0' y='0' rx='10' ry='10' width='600' height='600' />
  </ContentLoader>
)

export default ProfileSkeleton
