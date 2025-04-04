import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import * as taskService from '../services/taskService';
import { act } from 'react';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  },
  ToastContainer: () => <div />
}));

jest.mock('../services/taskService');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form and input fields', async () => {
    taskService.getTasks.mockResolvedValueOnce({ data: [] });

    await act(async () => {
        render(<App />);
      });      
    expect(await screen.findByText(/Add a Task/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  test('can type into form inputs', async () => {
    taskService.getTasks.mockResolvedValueOnce({ data: [] });

    await act(async () => {
        render(<App />);
      });      
    const titleInput = screen.getByPlaceholderText('Title');
    const descInput = screen.getByPlaceholderText('Description');

    fireEvent.change(titleInput, { target: { value: 'My Task' } });
    fireEvent.change(descInput, { target: { value: 'Do something' } });

    expect(titleInput.value).toBe('My Task');
    expect(descInput.value).toBe('Do something');
  });

  test('adds a task and resets form', async () => {
    taskService.getTasks.mockResolvedValue({ data: [] });
    taskService.addTask.mockResolvedValue({});
    taskService.getTasks.mockResolvedValueOnce({
      data: [{ id: 1, title: 'My Task', description: 'Do something' }]
    });

    await act(async () => {
        render(<App />);
      });

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'My Task' }
    });

    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Do something' }
    });

    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(taskService.addTask).toHaveBeenCalled();
    });

    expect(taskService.getTasks).toHaveBeenCalledTimes(2);
  });

  test('deletes a task', async () => {
    const task = { id: 1, title: 'T1', description: 'D1' };
    taskService.getTasks.mockResolvedValueOnce({ data: [task] });
    taskService.getTasks.mockResolvedValueOnce({ data: [] });
    taskService.deleteTask.mockResolvedValue({});

    await act(async () => {
        render(<App />);
      });
      
    const deleteBtn = await screen.findByText('Done');

    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(taskService.deleteTask).toHaveBeenCalledWith(1);
    });
  });
});
