import { render } from '@testing-library/react'
import Home from '../app/page'

test('grid snapshot', () => {
  const { asFragment } = render(<Home />)
  expect(asFragment()).toMatchSnapshot()
})
