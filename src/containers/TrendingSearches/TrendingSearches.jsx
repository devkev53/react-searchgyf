import { useState, useEffect } from 'react'
import { useRef } from 'react'
// Import components
import Category from 'components/Category/Category'
// Import services
import { getTrendingTerms } from 'services/getTrendingTermsService'
// Import styles
import './TrendingSearches.scss'

const TrendingSearches = () => {
  const [trends, setTrends] = useState([])

  useEffect(() => {
    getTrendingTerms()
      .then(setTrends)
  }, [])

  return (
    <Category name='Trending' options={trends} />
  )
}

// export default TrendingSearches

export const LazyTrending = () => {
  // Create a state for the component
  const [show, setShow] = useState(false)
  // Create a ref for the component
  const elementRef = useRef()

  useEffect(() => {

    let observer

    const onChange = (entries) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setShow(true)
        observer.disconnect()
      }
    }

    // Utilizando el polifyl de intersection-observer
    Promise.resolve(
      typeof window.IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import ('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: '50px'
      })

      observer.observe(elementRef.current)
    })



    return () => observer && observer.disconnect()
  })

  return <div ref={elementRef} id="LazyTrending">
    {show ? <TrendingSearches /> : <h3>Loading</h3>}
  </div>

}