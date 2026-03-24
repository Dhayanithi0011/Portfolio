import { useEffect, useRef } from 'react'

/**
 * Returns a ref. Attach it to any element.
 * Once ~13% of the element enters the viewport it gets the
 * `in-view` class, triggering the CSS entrance animation.
 */
export default function useInView(threshold = 0.13, rootMargin = '0px') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
