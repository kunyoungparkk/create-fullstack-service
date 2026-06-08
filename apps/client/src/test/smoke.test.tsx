import { render, screen } from '@testing-library/react';

test('테스트 환경이 컴포넌트를 렌더링한다', () => {
  render(<h1>환영합니다</h1>);

  expect(screen.getByRole('heading', { name: '환영합니다' })).toBeInTheDocument();
});
