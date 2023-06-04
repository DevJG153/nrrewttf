import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collections, User } from '../../types';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitalized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignup, setProcessingSignup] = useState(false);
  const [processingSignin, setProcessingSignin] = useState(false);

  useEffect(() => {
    const unsubsribe = auth().onUserChanged(async fbUser => {
      console.log('fbUser', fbUser);
      if (fbUser != null) {
        // login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
        });
      } else {
        // logout
        setUser(null);
      }
      setInitalized(true);
    });
    return () => {
      unsubsribe();
    };
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignup(true); //try를 안걸고 구문 진행하면 만약 실패시 계속 true에 머물기에, 계속 시도를 해주기 위함
      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password); //firebase에 회원가입
        await currentUser.updateProfile({ displayName: name });
        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
          }); //firebase에 DB저장
      } finally {
        setProcessingSignup(false); //finally를 통해 에러가 나든 항상 false로 되게 만든다
      }
    },
    [],
  );

  const signin = useCallback(async (email: string, password: string) => {
    try {
      setProcessingSignin(true);
      auth().signInWithEmailAndPassword(email, password);
    } finally {
      setProcessingSignin(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signup,
      processingSignup,
      signin,
      processingSignin,
    };
  }, [initialized, user, signup, processingSignup, signin, processingSignin]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
