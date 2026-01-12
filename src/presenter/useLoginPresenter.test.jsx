import { renderHook, act } from '@testing-library/react-native';
import { useLoginPresenter } from './useLoginPresenter';
import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('useLoginPresenter - handleSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show alert when email or password is empty', async () => {
    const { result } = renderHook(() => useLoginPresenter());

    act(() => {
      result.current.setEmail('');
      result.current.setPassword('password');
    });

    await act(async () => {
      await result.current.handleSignIn();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Erro', 'Por favor, preencha e-mail e senha.');
    expect(supabase.auth.signInWithPassword).not.toHaveBeenCalled();
  });
});