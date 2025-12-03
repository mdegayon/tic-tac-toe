import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableCell from './TableCell';
import BlinkService from '../../services/BlinkService';

// Mock the BlinkService
jest.mock('../../services/BlinkService', () => ({
  subscribe: jest.fn(),
}));

describe('TableCell', () => {
  const defaultProps = {
    playerIcon: '',
    onClickChange: jest.fn(),
    isWinningRow: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty cell when no playerIcon is provided', () => {
    const { container } = render(
      <table><tbody><tr><TableCell {...defaultProps} /></tr></tbody></table>
    );
    
    const td = container.querySelector('td');
    expect(td).toBeInTheDocument();
    expect(td.querySelector('i')).not.toBeInTheDocument();
  });

  it('should render icon when playerIcon is provided', () => {
    const { container } = render(
      <table><tbody><tr><TableCell {...defaultProps} playerIcon="nes-icon is-large heart" /></tr></tbody></table>
    );
    
    const icon = container.querySelector('i');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('nes-icon', 'is-large', 'heart');
  });

  it('should call onClickChange when cell is clicked', () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <table><tbody><tr><TableCell {...defaultProps} onClickChange={mockOnClick} /></tr></tbody></table>
    );
    
    const td = container.querySelector('td');
    fireEvent.click(td);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should not apply winning-row class when isWinningRow is false', () => {
    const { container } = render(
      <table><tbody><tr><TableCell {...defaultProps} isWinningRow={false} /></tr></tbody></table>
    );
    
    const td = container.querySelector('td');
    expect(td).not.toHaveClass('winning-row');
  });

  it('should apply winning-row class when isWinningRow is true', () => {
    const { container } = render(
      <table><tbody><tr><TableCell {...defaultProps} isWinningRow={true} /></tr></tbody></table>
    );
    
    const td = container.querySelector('td');
    expect(td).toHaveClass('winning-row');
  });

  it('should subscribe to BlinkService when isWinningRow is true', () => {
    const mockUnsubscribe = jest.fn();
    BlinkService.subscribe.mockReturnValue(mockUnsubscribe);
    
    render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon="nes-icon is-large heart is-empty"
          isWinningRow={true}
        />
      </tr></tbody></table>
    );
    
    expect(BlinkService.subscribe).toHaveBeenCalledTimes(1);
    expect(BlinkService.subscribe).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should unsubscribe from BlinkService on unmount', () => {
    const mockUnsubscribe = jest.fn();
    BlinkService.subscribe.mockReturnValue(mockUnsubscribe);
    
    const { unmount } = render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon="nes-icon is-large heart is-empty"
          isWinningRow={true}
        />
      </tr></tbody></table>
    );
    
    unmount();
    
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('should toggle icon class based on blink state', () => {
    let blinkCallback;
    BlinkService.subscribe.mockImplementation((callback) => {
      blinkCallback = callback;
      return jest.fn();
    });
    
    const { container } = render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon="nes-icon is-large heart is-empty"
          isWinningRow={true}
        />
      </tr></tbody></table>
    );
    
    // Simulate blink state change to true (should add is-empty)
    act(() => {
      blinkCallback(true);
    });
    
    let icon = container.querySelector('i');
    expect(icon).toHaveClass('is-empty');
    
    // Simulate blink state change to false (should remove is-empty)
    act(() => {
      blinkCallback(false);
    });
    
    icon = container.querySelector('i');
    expect(icon).not.toHaveClass('is-empty');
  });

  it('should not subscribe to BlinkService when isWinningRow is false', () => {
    render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon="nes-icon is-large heart"
          isWinningRow={false}
        />
      </tr></tbody></table>
    );
    
    expect(BlinkService.subscribe).not.toHaveBeenCalled();
  });

  it('should not subscribe to BlinkService when no icon is present', () => {
    render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon=""
          isWinningRow={true}
        />
      </tr></tbody></table>
    );
    
    expect(BlinkService.subscribe).not.toHaveBeenCalled();
  });

  it('should have aria-hidden attribute on icon', () => {
    const { container } = render(
      <table><tbody><tr>
        <TableCell {...defaultProps} playerIcon="nes-icon is-large heart" />
      </tr></tbody></table>
    );
    
    const icon = container.querySelector('i');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should update when playerIcon prop changes', () => {
    const { container, rerender } = render(
      <table><tbody><tr>
        <TableCell {...defaultProps} playerIcon="nes-icon is-large heart" />
      </tr></tbody></table>
    );
    
    let icon = container.querySelector('i');
    expect(icon).toHaveClass('heart');
    
    rerender(
      <table><tbody><tr>
        <TableCell {...defaultProps} playerIcon="nes-icon is-large star" />
      </tr></tbody></table>
    );
    
    icon = container.querySelector('i');
    expect(icon).toHaveClass('star');
  });

  it('should handle icon with is-empty class correctly', () => {
    const { container } = render(
      <table><tbody><tr>
        <TableCell
          {...defaultProps}
          playerIcon="nes-icon is-large heart is-empty"
        />
      </tr></tbody></table>
    );
    
    const icon = container.querySelector('i');
    expect(icon).toHaveClass('nes-icon', 'is-large', 'heart', 'is-empty');
  });
});
