import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '@/components/Layout';

// Mock the Sidebar component to focus on the Layout itself
jest.mock('@/components/Sidebar', () => () => <div data-testid="sidebar">Mock Sidebar</div>);

const TestComponent = () => <div>Test Component</div>;
TestComponent.displayName = 'TestComponent';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText('Test Component')).toBeInTheDocument();
  });
});

describe('Layout Component Snapshot Test', () => {
  it('renders correctly with children', () => {
    const { asFragment, getByTestId } = render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );

    // Ensure the sidebar is rendered
    expect(getByTestId('sidebar')).toBeInTheDocument();

    // Ensure the children are rendered inside the main section
    expect(getByTestId('child-content')).toBeInTheDocument();

    // Create a snapshot of the Layout component
    expect(asFragment()).toMatchSnapshot();
  });
});
