import manifestPath from '../manifest.txt'

export default function () {
  const link = document.createElement('link')
  link.rel = 'manifest'
  link.href = manifestPath
  document.head.appendChild(link)
}

