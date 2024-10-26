import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { User } from 'firebase/auth';
import {
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import { useFirebaseAuth } from '@/domain/firebase/hooks/useFirebaseAuth';
import { firebaseGoogleProvider } from '@/domain/firebase/FirebaseClient';

/**
 * state
 */
interface AuthContextState {
  isReady: boolean;
  user: User | null;
  isLogin: boolean;
}
const initAuthContextState = (): AuthContextState => ({
  isReady: false,
  user: null,
  isLogin: false,
});

/**
 * action
 */
interface AuthContextAction {
  googleLogin: () => Promise<void>;
}
const initAuthContextAction = () => ({
  googleLogin: async () => {},
});

/**
 * context
 */
interface AuthContextValues {
  authState: AuthContextState;
  authAction: AuthContextAction;
}
const initAuthContextValues = (): AuthContextValues => ({
  authState: initAuthContextState(),
  authAction: initAuthContextAction(),
});

const AuthContext = createContext<AuthContextValues>(initAuthContextValues());

export const useAuthContext = () => useContext(AuthContext);

/**
 * provider
 */
interface AuthContextProps {
  defaultValues?: AuthContextState;
  children?: ReactNode;
}

export function AuthProvider({
  children,
  defaultValues = initAuthContextState(),
}: AuthContextProps) {
  // hooks
  const auth = useFirebaseAuth();

  // state
  const [currentUser, setCurrentUser] = useState<User | null>(
    defaultValues.user,
  );
  const [isReady, setIsReady] = useState<boolean>(defaultValues.isReady);

  // memo
  const isLogin = useMemo(() => Boolean(currentUser), [currentUser]);

  console.log('AuthProvider', {
    isReady,
    isLogin,
    currentUser,
  });

  /**
   * 初回実行
   */
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (_user) => {
      console.log(
        'AuthProvider useEffect unsubscribed() onAuthStateChanged',
        auth,
        _user,
      );
      try {
        setCurrentUser(_user);
      } catch (e) {
        console.error(e);
      } finally {
        if (!isReady) {
          setIsReady(true);
        }
      }
    });

    // クリーンアップ
    return () => {
      unsubscribed();
    };
  }, []);

  /**
   * google認証リダイレクト
   */
  useEffect(() => {
    const fetchRedirectResult = async () => {
      const result = await getRedirectResult(auth);
      console.log('AuthProvider useEffect fetchRedirectResult()', auth, result);
      if (result) {
        setCurrentUser(result.user);
      } else {
        console.log('No redirect result, user may not have authenticated.');
      }
    };

    fetchRedirectResult().catch(console.error);
  }, []);
  /*
  useEffect(() => {
    getRedirectResult(auth).then((_result) => {
      console.log('AuthProvider useEffect getRedirectResult()', auth, _result);
      if (_result) {
        const credential = GoogleAuthProvider.credentialFromResult(_result);
        console.log(
          'AuthProvider useEffect getRedirectResult() credential',
          credential,
        );

        if (credential) {
          const user = _result.user;
          setCurrentUser(user);
        }
      }
    });
  }, [auth, getRedirectResult]);
  */

  /**
   * google認証でログインを行う
   */
  const googleLogin = useCallback(async () => {
    await signInWithRedirect(auth, firebaseGoogleProvider);
  }, [auth, firebaseGoogleProvider]);

  const value: AuthContextValues = {
    authState: {
      isReady,
      user: currentUser,
      isLogin,
    },
    authAction: {
      googleLogin,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
