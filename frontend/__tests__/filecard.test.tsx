import { render } from '@testing-library/react'
import FileCard from '../components/FileCard'

test('renders file card', () => {
  const { asFragment } = render(
    <FileCard file={{ id: '1', file: 'a.jpg', size: 10, uploaded_at: '', download_url: '' }} />
  )
  expect(asFragment()).toMatchSnapshot()
})
