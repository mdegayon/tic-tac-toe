import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditableField from './EditableField';

describe('EditableField', () => {
  const initialValue = 'Initial Value';
  const newValue = 'New Value';
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should display the initial value', () => {
    render(<EditableField value={initialValue} onChange={mockOnChange} />);
    expect(screen.getByText(initialValue)).toBeInTheDocument();
  });

  it('should switch to edit mode when clicked', () => {
    render(<EditableField value={initialValue} onChange={mockOnChange} />);
    
    const displayText = screen.getByText(initialValue);
    fireEvent.click(displayText);
    
    const input = screen.getByDisplayValue(initialValue);
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it('should call onChange with new value when input loses focus', () => {
    render(<EditableField value={initialValue} onChange={mockOnChange} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText(initialValue));
    
    // Change the value
    const input = screen.getByDisplayValue(initialValue);
    fireEvent.change(input, { target: { value: newValue } });
    
    // Exit edit mode
    fireEvent.blur(input);
    
    expect(mockOnChange).toHaveBeenCalledWith(newValue.trim());
  });

  it('should not call onChange if value is empty or unchanged', () => {
    render(<EditableField value={initialValue} onChange={mockOnChange} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText(initialValue));
    
    // Set empty value
    const input = screen.getByDisplayValue(initialValue);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.blur(input);
    
    // Should not call onChange for empty value
    expect(mockOnChange).not.toHaveBeenCalled();
    
    // Should revert to initial value
    expect(screen.getByText(initialValue)).toBeInTheDocument();
  });

  it('should handle Enter and Escape keys', () => {
    render(<EditableField value={initialValue} onChange={mockOnChange} />);
    
    // Enter edit mode
    fireEvent.click(screen.getByText(initialValue));
    
    const input = screen.getByDisplayValue(initialValue);
    
    // Test Enter key
    fireEvent.change(input, { target: { value: newValue } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnChange).toHaveBeenCalledWith(newValue);
    
    // Should exit edit mode after Enter
    expect(screen.queryByDisplayValue(newValue)).not.toBeInTheDocument();
    
    // Enter edit mode again
    fireEvent.click(screen.getByText(initialValue));
    
    // Test Escape key
    fireEvent.keyDown(screen.getByDisplayValue(initialValue), { key: 'Escape' });
    
    // Should exit edit mode without saving
    expect(screen.queryByDisplayValue(initialValue)).not.toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledTimes(1); // Only the Enter key press should trigger onChange
  });
});
