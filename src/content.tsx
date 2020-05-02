import * as React from 'react'
import * as ReactDOM from 'react-dom'

const Content: React.FC = () => {
  return <div>Content</div>
}

const $div = document.createElement('div')
document.body.appendChild($div)
ReactDOM.render(<Content />, $div)
