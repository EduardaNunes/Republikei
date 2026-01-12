import { render, act } from '@testing-library/react-native';
import { NewPostProvider, NewPostContext } from './NewPostContext';
import { savePropertyService } from '@/presenter/postPresenter';
import { INITIAL_FORM_DATA } from '@/utils/types';
import React from 'react';

jest.mock('@/presenter/postPresenter', () => ({
  savePropertyService: jest.fn(),
}));

describe('NewPostContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update form data', () => {
    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(NewPostContext);
      return null;
    };

    render(
      <NewPostProvider>
        <TestComponent />
      </NewPostProvider>
    );

    act(() => {
      contextValue.updateFormData({ preco: 1500 });
    });

    expect(contextValue.formData.preco).toBe(1500);
  });

  it('should save property successfully', async () => {
    savePropertyService.mockResolvedValue(undefined);

    let contextValue;
    const TestComponent = () => {
      contextValue = React.useContext(NewPostContext);
      return null;
    };

    render(
      <NewPostProvider>
        <TestComponent />
      </NewPostProvider>
    );

    await act(async () => {
      await contextValue.saveProperty();
    });

    expect(savePropertyService).toHaveBeenCalledWith(INITIAL_FORM_DATA, undefined);
    expect(contextValue.isSubmitting).toBe(false);
    expect(contextValue.submissionError).toBeNull();
    expect(contextValue.submissionSuccess).toBe(true);
  });
});