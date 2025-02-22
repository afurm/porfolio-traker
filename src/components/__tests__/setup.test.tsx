import { render, screen } from '@/utils/test-utils';

describe('Testing Setup', () => {
  it('should work properly', () => {
    render(<div>Test Component</div>);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
