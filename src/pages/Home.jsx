import classNames from 'classnames'
import React, { useState } from 'react'
import PostList from '../components/post/PostList'
import Container from '../components/ui/Container'
import classes from './Home.module.css'

function Home() {
  const [searchTerms, setSearchTerms] = useState('')
  const [sort, setSort] = useState('+like')
  const [layout, setLayout] = useState('horizontal')

  const handleSearchChange = (e) => setSearchTerms(e.target.value)
  const handleSortChange = (e) => setSort(e.target.value)
  const handleLayoutChange = (type) => () => setLayout(type)

  const activeLayoutClass = (type) =>
    classNames({ [classes.activeLayout]: type === layout })

  return (
    <Container>
      <div className={classes.postListHeader}>
        <input
          type='text'
          name='search'
          placeholder='Search...'
          value={searchTerms}
          onChange={handleSearchChange}
          className={classes.search}
        />
        <div className={classes.headerEnd}>
          <select onChange={handleSortChange} className={classes.sort}>
            <option value='+like'>Like: ASC</option>
            <option value='-like'>Like: DESC</option>
          </select>
          <div className={classes.layoutChanger}>
            <i
              className={'fas fa-grip-lines ' + activeLayoutClass('vertical')}
              onClick={handleLayoutChange('vertical')}
            />
            <i
              className={'fas fa-th-large ' + activeLayoutClass('horizontal')}
              onClick={handleLayoutChange('horizontal')}
            />
          </div>
        </div>
      </div>
      <PostList searchTerms={searchTerms} sort={sort} layout={layout} />
    </Container>
  )
}

export default Home
