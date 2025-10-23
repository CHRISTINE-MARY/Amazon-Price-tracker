import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Modal from './Modal';
import { Line } from 'react-chartjs-2';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


describe('Modal Component', () => {

  it('renders nothing when message and graphData are null/undefined', () => {
    act(() => {
      render(<Modal message={null} graphData={null} onClose={() => {}} />, container);
    });
    expect(container.innerHTML).toBe("");
  });

  it('renders the modal overlay and content when message is present', () => {
    act(() => {
      render(<Modal message="Test message" graphData={null} onClose={() => {}} />, container);
    });
    expect(container.querySelector('.modal-overlay')).toBeInTheDocument();
    expect(container.querySelector('.modal-content')).toBeInTheDocument();
    expect(container.textContent).toContain("Test message");
  });

  it('renders the message when provided', () => {
    act(() => {
      render(<Modal message="Hello world!" graphData={null} onClose={() => {}} />, container);
    });
    expect(container.querySelector('p').textContent).toBe("Hello world!");
  });

  it('renders the graph when graphData is provided', () => {
    const mockGraphData = {
      labels: ['January', 'February', 'March'],
      datasets: [{ label: 'Test Data', data: [10, 20, 15] }],
    };

    act(() => {
      render(<Modal message={null} graphData={mockGraphData} onClose={() => {}} />, container);
    });

    expect(container.querySelector('canvas')).toBeInTheDocument(); // Check if canvas exists (Chart)
    expect(container.textContent).toContain('Price Trend'); //Check title
  });

  it('calls onClose function when close button is clicked', () => {
    const onCloseMock = jest.fn();
    act(() => {
      render(<Modal message="Test message" graphData={null} onClose={onCloseMock} />, container);
    });

    const closeButton = container.querySelector('.close-btn');
    act(() => {
      closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('renders both message and graph when both are provided', () => {
    const mockGraphData = {
      labels: ['January', 'February', 'March'],
      datasets: [{ label: 'Test Data', data: [10, 20, 15] }],
    };

    act(() => {
      render(<Modal message="Combined test" graphData={mockGraphData} onClose={() => {}} />, container);
    });

    expect(container.textContent).toContain("Combined test");
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('checks if the width and height style is applied to the graph container', () => {
    const mockGraphData = {
      labels: ['January', 'February', 'March'],
      datasets: [{ label: 'Test Data', data: [10, 20, 15] }],
    };

    act(() => {
      render(<Modal message={null} graphData={mockGraphData} onClose={() => {}} />, container);
    });

    const graphContainer = container.querySelector('div[style*="width"]');
    expect(graphContainer).toBeInTheDocument();

  });

});
```